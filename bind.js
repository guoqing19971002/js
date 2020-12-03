/* function foo (age){
    this.age = age
    console.log(this.name,this.age)
} */
function foo (a,b){
    console.log(this.name+'的年龄是'+`${a+b}`)
}

const obj1 = {
    name:'小明'
}
foo.__proto__.myBind = function(){
    /* 获取this将要指向的对象 */
   const obj = Array.prototype.slice.call(arguments)[0]
   /* 获取剩下的传入bind的参数 */

  /* 
  bind()的另一个最简单的用法是使一个函数拥有预设的初始参数。只要将这些参数（如果有的话）作为 bind()的参数写在 this 后面。
  当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们后面。

  其实偏函数的原理很简单，bind中传入的参数数组，出现在执行函数的数组前端即可。
  */

   const params = Array.prototype.slice.call(arguments).splice(1)
   /* 保存调用bind的函数 */
   const fun = this
   /* binb只会改变this指向，不会调用函数。而call既会调用函数又会改变this
   因此就有思路了，可以在自己的bind中返回一个call函数（注意不是call函数的调用）。
   这里再次用到了柯里化*/
   return function(args){
       fun.apply(obj,params.concat(args))
   }
}

//console.log(foo.__proto__)
//foo(18)
//foo.myBind(obj1)(20);
/* foo中的this指向了obj1,因此obj1会增加一个age属性 */
//console.log(obj1)
//foo.myBind(obj1)()
//console.log(foo.myBind(obj1))
foo.myBind(obj1,5)(7,8)
//foo.bind(obj1,5)(7,8)