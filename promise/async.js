// const fs = require("fs");
function promisify_readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
/*
Generator的函数异步应用之async函数。
*/

/* 
前文说到async/await是异步编程的'终极'解决方案，终极二字就体现在,操作异步上无论是操作逻辑还是语义
都与同步操作无限接近（当然只是形式上像）。。
这是使用Generator函数控制异步流程代码
 */
/* function* gen() {
  const res1 = yield promisify_readFile("./text1.txt");
  console.log(res1.toString());
  const res2 = yield promisify_readFile("./text2.txt");
  console.log(res2.toString());
}
co(gen); */

// 下面使用async/await实现
/* const asyncReadFile = async () => {
  const res1 = await promisify_readFile("./text1.txt");
  console.log(res1.toString());
  const res2 = await promisify_readFile("./text2.txt");
  console.log(res2.toString());
}; */

/*
可以看到
从形式上看 async/await进行异步流程处理，无需执行器，函数可以像普通函数一样执行，这意味着async函数内置了gen函数的执行器。
从语义上将， async关键字表示函数内部有异步操作，await关键字表示等待异步操作执行完毕。
下面具体介绍
 */

/*
- 特点
async函数返回的是Promise对象 因此可以为async函数指定then方法
 */
/* asyncReadFile().then(() => {
  console.log("end");
}); */

/*
既然async函数返回的是Promise对象，那其结果和状态由什么决定呢 
当async函数内部的return有返回值时，该参数会成为then方法成功回调的参数 状态变为成功
当async函数内部抛出错误则会执行失败回调或catch方法 状态变为失败
 */

/* const asyncReadFile = async () => {
  const res = await promisify_readFile("./text1.txt");
  return new Error(res);
};
const test = asyncReadFile();
test.then(
  (res) => {
    console.log("success" + res);
  },
  (r) => {
    console.log("errrrrr" + r);
  }
);
setTimeout(() => {
  console.log(test);
}, 500);
 */

/*
await命令只能用在async函数之中，如果用在普通函数，就会报错。
await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值 
 */

/*
错误处理 

async函数中的任何一个Promise如果变为reject 则async会立即变为reject，会立即中断执行，并执行相应的错误回调
如果不想终止执行 可以将可能抛出错误的promise包在try。。catch代码块中  多个await可以统一包在try...catch中
也可以在可能抛出错误的promise后加catch方法
 */

/*
实现原理
1 async函数内置了执行器 
2 async函数要等内部所有Promise执行完后再改变状态
我们假设执行器叫做spawn函数 我们只需将Generator函数传入该执行器即可
接下来实现执行器 其实其原理前面讨论的co模块基本一致 要等内部所有Promise执行完后再改变状态
co返回的也是promise 它的状态何时改变？
 */
/* function spawn(genF) {
  return new Promise(function (resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch (e) {
        return reject(e);
      }
      if (next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(
        function (v) {
          step(function () {
            return gen.next(v);
          });
        },
        function (e) {
          step(function () {
            return gen.throw(e);
          });
        }
      );
    }
    step(function () {
      return gen.next(undefined);
    });
  });
} */

function spawn(genF) {
  return new Promise(function (resolve, reject) {
    const gen = genF();
    function step(data) {
      let res;
      try {
        res = gen.next(data);
      } catch (e) {
        return reject(e);
      }
      if (res.done) {
        return resolve(res.value);
      }
      Promise.resolve(res.value).then(step, (r) => reject(r));
    }
    step();
  });
}

const promisify = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 500);
  });
};

const promisify2 = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
};

function* testGen() {
  const res1 = yield promisify(1);
  console.log(res1);
  const res2 = yield promisify(2);
  console.log(res2);
  return res2;
}

const async = (gen) => {
  return spawn(gen);
};

/* const foo = async(testGen);
setTimeout(() => {
  console.log(foo);
},2000); */

/* 
环境栈
async 函数可以保留运行堆栈。

在前面对执行上下文的讨论时我们知道，
JavaScript 代码运行时，会产生一个全局的上下文环境（context，又称运行环境），包含了当前所有的变量和对象。
执行函数（或块级代码）的时候，又会在当前上下文环境的上层，产生一个函数运行的上下文，变成当前（active）的上下文，
由此形成一个上下文环境的堆栈（context stack）。
这个堆栈是“后进先出”的数据结构，最后产生的上下文环境首先执行完成，退出堆栈，然后再执行完成它下层的上下文，直至所有代码执行完成，堆栈清空。

Generator 函数不是这样，它执行产生的上下文环境，一旦遇到yield命令，就会暂时退出堆栈，
但是并不消失，里面的所有变量和对象会冻结在当前状态。等到对它执行next命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。

而async函数是Generator函数的语法糖，因此他也有一样的特性

这条特性可以理解为 await语句后面的所有代码会进入异步任务队列 相当与全部放进了promise.then的回调函数中

应用
休眠器
不存在继发关系，最好让它们同时触发。 并发执行可以用Promise.all
 */

const timeOut = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

/* 每隔半秒打印 最后打印end */
/* (async function () {
  for (let i = 0; i < 3; i++) {
    await timeOut();
    console.log(i);
  }
  console.log("end");
})();
 */

/*由于块级作用域 会打印012 但会先打印end  且012会几乎同时打印
执行环境站不会被冻结 因此循环的进行不受影响 三个微任务几乎同时被加入队列 
 */
/* (function () {
  for (let i = 0; i < 3; i++) {
    timeOut().then(() => {
      console.log(i);
    });
  }
  console.log("end");
})(); */
// console.log("asd");

/*
利用这一点 可以实现休眠器 
 */

/* function sleep(interval) {
  return new Promise((resolve) => {
    setTimeout(resolve, interval);
  });
}
// 用法
async function Async(timeOut) {
  await sleep(timeOut);
  console.log("foo!");
}
Async(1000); */

/* 
通过上例也能看出 只能写在async上下文中 否则将不生效 也即 虽然看起来像同步 但实质还是异步 不会阻塞代码
没有继发关系的异步 尽量不要这么写 */
