/*
 * @Author: your name
 * @Date: 2020-10-21 13:43:57
 * @LastEditTime: 2021-02-24 16:33:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \js\closure.js
 */
/* let count = 10;
function fn1(){
    let count = 0;
    function fn2 (){
        count++
        return count
    }
    return fn2
}

let result1 = fn1()
console.log(result1()) // 1
console.log(result1()) // 2 */
/* 
　var name = "The Window";

　　var object = {
　　　　name : "My Object",

　　　　getNameFunc : function(){
　　　　　　var that = this;
　　　　　　return function(){
　　　　　　　　return that.name;
　　　　　　};

　　　　}

　　};

　　alert(object.getNameFunc()());  // My Object */

/* 闭包 函数外部访问函数内部变量 怎么访问？ 函数内部再创建一个子函数，此函数将父函数的变量
return出去。再父函数外部引用此子函数。

 */
/*  globalThis.name = '小红'
 const obj = {
    name:'小刚',
    fn:function foo(){
        const name = '小米'
        console.log(this.name)
        return function (){
           console.log(this.name)
        }
    }
 } */

//const fn1 = obj.fn() //函数fn被调用 拥有者是foo 因此this指向obj 小刚
//fn1.call(obj) // 函数fn被调用 拥有者是全局 小红 可以用call将this指向obj
//console.log(fn()) // fn函数访问了 foo函数的内部变量name 闭包形成

/*
 形成闭包的两种方式
 1 函数自己return 一个函数 该函数可以访问自己的内部变量
 2 函数内部将私有变量赋给一个全局变量 
 */
/* let a = null
 function foo (){
     const name = 'xiaom1'
     function getName (){
         return name
     }
     a = getName
 }
foo()
console.log(a()) */

// 闭包的典型应用就是柯里化 柯里化函数会return一个函数 该函数会访问柯里化函数的参数/变量
// 当在外部用变量接受这个返回的函数时，则该变量调用时就访问了柯里化函数的内部变量 闭包形成

/* 
function add () {
    let args = [...arguments];//把arguments类数组模式参数转换成数组
    let fun = function () {
        let newArgs = args.concat([...arguments]);//利用闭包，合并arguments参数
        return add.apply(null, newArgs)
        
    }
    
    //求和a + b
    fun.toString = function() {
        return args.reduce((a, b) => a + b)
    }
    return fun
}


console.log(add(1,2)) */

/* function foo (){
    let name = 'xiaom'
    return function (){
        return name
    }
}

const bar = foo()
let myName = bar()
myName = 'xioh'
console.log(bar()) */

// 全局变量bar获取到了局部作用域foo的内部变量

/* for (var i = 1; i <= 5; i++) {

   function foo (i){
    setTimeout(function timer() {
        console.log(i);
      }, i * 1000);
   }
   foo(i)
  } */
/* 
for (var i = 1; i <= 5; i++) {
    (function (i) {
      setTimeout(function timer() {
        console.log(i);
      }, i * 1000);
    })(i)
  } */

/* function foo() {
  console.log(this.name);
}

const obj = {
  name: "xiaom",
};

function curryingFn(fn) {
  return (obj) => {
     
    fn.apply(obj)
  }
}

const newFoo = curryingFn(foo)
newFoo(obj)
 */

/* function foo (action){
  console.log(this.name + action)
}
const obj1 = {
  name:'小明'
}
foo.__proto__.myBind = function(){
 const obj = Array.prototype.slice.call(arguments)[0]
 const fun = this
 return args => fun.call(obj,args)
}
const newFoo = foo.myBind(obj1)
newFoo('跑步')
 */

function foo(action) {
  console.log(this.name + action);
}
const obj1 = {
  name: "小明",
};
foo.__proto__.myBind = function (obj) {
  const fun = this;
  return function (args) {
    fun.call(obj, args);
  };
};
const newFoo = foo.myBind(obj1);
newFoo("跑步"); // 小明跑步
