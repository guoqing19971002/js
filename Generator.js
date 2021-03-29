/*
Generator 函数是一个状态机，执行 Generator 函数会返回一个遍历器对象. 
语法
function关键字与函数名之间有一个星号；函数体内部使用yield表达式，定义不同的内部状态
调用 Generator 函数后，该函数并不执行，返回的是一个指向内部状态的指针对象（Iterator Object）。
 */

/*
 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，
 从而使得该对象具有 Iterator 接口。

 */
/* var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
[...myIterable]; // [1, 2, 3] */

function* foo(x) {
  var y = 2 * (yield x + 1);
  var z = yield y / 3;
  return x + y + z;
}

var a = foo(5);
a.next(); // Object{value:6, done:false}
a.next(); // Object{value:NaN, done:false}
a.next(); // Object{value:NaN, done:true}
var b = foo(5);
// console.log(b.next());// { value:6, done:false }
// console.log(b.next(12));// { value:8, done:false }
// console.log(b.next(13));// { value:42, done:true }
/*
上面代码第一次调用b的next方法时，返回x+1的值6；
第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8；
第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，
这时x等于5，y等于24，所以return语句的值等于42。
注意，yield表达式本身没有返回值，或者说总是返回undefined。他的值只是作为next方法返回的对象的value值。而与下个
yield表达式的参数毫无关系。当且仅当next方法带了参数，该参数才会被当作上一个yield表达式的返回值。
说白了 next(12) 相当于将上个yield表达式替换成一个值 12

注意，由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。
V8引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。
从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。 
 */
// 实现肥波纳妾数列
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

/*  for (let n of fibonacci()) {
    if (n > 1000) break;
    console.log(n);
  } */

/*
js对象没有遍历器接口 因此无法被for of 遍历 
除了手动部署[symbol itorter]属性外
由于gengerter会返回遍历器对象 因此也可以用它 
*/

function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

let jane = { first: "Jane", last: "Doe" };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// 区别是 手动部署[symbol itorter]属性 for of 可以直接遍历原对象，会自动去遍历[symbol itorter]属性的遍历器对象
// gengerter方式 for of 遍历的是生成的遍历器对象

// 二者结合使用 那就是把gengerter生成的遍历器对象 赋值给[symbol itorter]属性

/*
ext()、throw()、return()这三个方法本质上是同一件事
它们的作用都是让 Generator 函数恢复执行
next(1)方法就相当于将yield表达式替换成一个值1
throw()是将yield表达式替换成一个throw语句。
return()是将yield表达式替换成一个return语句。 
 */

/* 
yield*表达式
用来在一个 Generator 函数里面执行另一个 Generator 函数。
不然 就要手动遍历了。
yield*后面的 Generator 函数（没有return语句时），等同于在 Generator 函数内部，部署一个for...of循环。
 */

function* iter1() {
  yield "a";
  yield "b";
}

function* iter2() {
  yield "c";
  yield "d";
}

function* concat() {
  yield* iter1(); // 必须调用后才返回遍历器对象！
  yield* iter2();
}

// 等同于

/* function* concat() {
  for (var value of iter1()) {
    yield value;
  }
  for (var value of iter2()) {
    yield value;
  }
} */
/* 
for (let i of concat()) {
  console.log(i);
} */

/*
任何数据结构只要有 Iterator 接口，就可以被yield*遍历。 
 */

/*
Generator 是实现状态机的最佳结构 
 */
/* var clock = function* () {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
}; */

function* load() {
  console.log("1");
  const res = yield setTimeout(() => {
    it.next(2);
  }, 200);
  console.log(res)
  console.log("3");
}

const it = load();
it.next();
console.log('4')

/*
等异步操作拿到结果 再执行next 继续向下执行代码 。注意要把回调结果传入next() 
因为yield表达式没有返回值。
yield后面的异步表达式，之后的代码。其实就可以看做回调函，或者then方法。
不会阻塞线程，实质就是异步的语法糖！
it.next(param)做的就是 通知generter 异步操作有结果了 可以继续执行了。并将结果传递出去。
而async/await 就是由包了一层语法糖
 */