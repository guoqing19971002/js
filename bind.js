function foo (age){
    this.age = age
    console.log(this.name,this.age)
}

const obj1 = {
    name:'小明'
}
foo.__proto__.myBind = function(obj){
   const fun = this
   /* binb只会改变this指向，不会调用函数。而call既会调用函数又会改变this
   因此就有思路了，可以在自己的bind中返回一个call函数（注意不是call函数的调用）。*/
   return function(args){
       fun.call(obj,args)
   }
}

//console.log(foo.__proto__)
foo(18)
foo.myBind(obj1)(20);
/* foo中的this指向了obj1,因此obj1会增加一个age属性 */
console.log(obj1)
//foo.myBind(obj1)()
//console.log(foo.myBind(obj1))