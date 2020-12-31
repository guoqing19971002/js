// 1 typeof
/* 
返回数据类型，包含这7种： number、boolean、symbol、string、object、undefined、function。

typeof null   返回类型错误，返回object
null 有属于自己的数据类型 Null
引用类型，
引用类型中的 数组、日期、正则 也都有属于自己的具体类型，而 typeof 对于这些类型的处理，
只返回了处于其原型链最顶端的 Object 类型.
function 返回 function

 */

/*  function foo (){
     console.log('xiao')
 }

 console.log(typeof foo) */
// 2 toString
/*
toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。这是一个内部属性，其格式为 [object Xxx] ，
其中 Xxx 就是对象的类型。对于 Object 对象，直接调用 toString()  就能返回 [object Object] 。而对于其他对象，
则需要通过 call / apply 来调用才能返回正确的类型信息。 
 */
/* console.log(
    Object.prototype.toString.call('str'),// [object String] 
    Object.prototype.toString.call(12),// [object Number]
    Object.prototype.toString.call([1,2]),//[object Array]
    Object.prototype.toString.call(false),//[object Boolean]
    Object.prototype.toString.call(undefined) ,// [object Undefined]
    Object.prototype.toString.call(null),// [object Null]
    Object.prototype.toString.call(new Function()) ,// [object Function]
    Object.prototype.toString.call(new Date()), // [object Date]
    Object.prototype.toString.call(new RegExp()), // [object RegExp]
    Object.prototype.toString.call(new Error()) // [object Error]
)
  */

  //3 instanceof
  /* 
  instanceof 是用来判断 A 是否为 B 的实例，表达式为：A instanceof B，如果 A 是 B 的实例，则返回 true,否则返回 false。
 在这里需要特别注意的是：instanceof 检测的是原型， */

 const arr = [1,2]

 console.log(arr instanceof Array) // true
 console.log(arr instanceof Object) // true