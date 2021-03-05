/* const obj1 = {
    a:10
}
function foo(){
    this.a = 20
    console.log(this.a)
}
 */
/* {}不会形成作用域 */

/* demo1 */
/* var a = 20;
function fn() {
  console.log(this.a);
}
fn(); */

/* demo2 */
/* function fn() {
    this.a = 20
  function foo() {
    console.log(this.a);
  }
  foo();
}
fn(); */
/* demo3 */
/* var a = 20;
var obj = {
  a: 10,
  c: this.a + 20, // {}不能单独形成作用域 obj中的this指向全局对象window
  // 注意用node环境运行时 顶层对象时golbal 不是window
  fn: function () {
    return this.a;
  }
}

console.log(obj.c);
console.log(obj.fn()); */

/* demo4 */
// 'use strict';
/* var a = 20;
function foo() {
  var a = 1;
  var obj = {
    a: 10,
    c: this.a + 20,
    fn: function () {
      console.log(this.a)
    }
  }
  obj.fn() // 10
}
foo() */
//foo()   // 函数独立调用 内部this指向window

/* demo6 */
//'use strict';
/* function foo() {
  console.log(this.a)
}

function active(fn) {
  console.log(this) // window 为什么? 因为active函数是独立调用的 this指向undefined 非严格模式下 指向window
  fn(); // 真实调用者，为独立调用 其内部this指向全局 a为20
}

var a = 20;
var obj = {
  a: 10,
  getA: foo
}
obj.getA() // 10  函数被obj调用 this指向obj
active(obj.getA); //20 */

/* 高阶函数的this */

/* globalThis.name = '小明'

const obj = {
  name:'小红',
  fn:function foo(){
    console.log(this.name) //小红
    return function bar(){
      console.log(this.name) //小明
    }
  }
}

//obj.fn()()
//等价于
const fn1 = obj.fn() // 函数fn调用 被obj拥有 this指向fn
fn1() // fn1独立调用 this指向全局
 */


/* 箭头函的this */


/* window.name = '123'
function say(){
   console.log(this.name) // 123
}
say() */


/* var o = {
  a: 10,
  b: {
    a: 12,
    fn: function () {
      console.log(this.a);
      //console.log(this);
    },
  },
};

var j = o.b.fn;
j();
o.b.fn(); */
/* var a = 1;
var obj = {
  a: 2,
  b: function() {
    return this.a;
  }
};
var t = obj.b;
console.log(t());
console.log(obj.b()) */

const obj = {
  foo:'xiaom',
  say:function () {
    console.log(this.foo)
  }
}

obj.say()
const {say } = obj
say.bind(obj)()