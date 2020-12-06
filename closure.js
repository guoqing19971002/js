/* let count = 10;
function fn1(){
    let count = 0;
    function fn2 (){
        count++
        console.log(count)
    }
    return fn2
}

let result1 = fn1()
let result2 = fn1()
result1();
result2(); */

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
 globalThis.name = '小红'
 const obj = {
    name:'小刚',
    fn:function foo(){
        const name = '小米'
        console.log(this.name)
        return function (){
           console.log(this.name)
        }
    }
 }
 

 const fn1 = obj.fn() //函数fn被调用 拥有者是foo 因此this指向obj 小刚
 fn1.call(obj) // 函数fn被调用 拥有者是全局 小红 可以用call将this指向obj
 //console.log(fn()) // fn函数访问了 foo函数的内部变量name 闭包形成