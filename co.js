function co(gen) {
  var ctx = this;

  return new Promise(function (resolve, reject) {
    function next(ret) {
      if (ret.done) return resolve(ret.value);
      return ret.value.then(onFulfilled);
    }
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      // console.log(ret.value);
      next(ret);
    }
    if (typeof gen === "function") gen = gen.call(ctx);
    if (!gen || typeof gen.next !== "function") return resolve(gen);
    onFulfilled();
  });
}

let s1 = function (time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("1");
    }, time);
  });
};
// 区分开来thunk和promise 一个是柯里化函数 一个是直接返回promise

let g = function* () {
  yield s1(1000);
  console.log("s1 end");
  yield s1(1000);
  console.log("s2 end");
};

/* let gen = g()
let r1 = gen.next()
r1.value(function (err, data) {
  if (err) throw err;
  var r2 = gen.next(data);
  r2.value(function (err, data) {
    if (err) throw err;
    gen.next(data);
  });
}); */
co(g);
/*
async函数返回一个 Promise 对象
async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态
async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，
除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。
async 函数可以保留运行堆栈 
 */
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
// spawn函数就相当于generator自动执行器
function spawn(genF) {
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
}
