// 1 typeof
/* 

该方法是开发中经常用到的判断数据类型的方法。
其返回的数据类型包含这7种： number、boolean、symbol、string、object、undefined、function。
而我们知道JavaScript的基本数据类型有6种分别是 String、Number、Boolean、Symbol、Undefined、Null。
引用类型有object， array， date， regexp，function，err。
因此可以看到，该方法对于基本类型，除了null外，其余类型的判断都可以返回想要的结果。但null有自己的类型，
typeof返回结果却是object。

typeof null   返回类型错误，返回object
null 有属于自己的数据类型 Null

对于引用类型。该方法除了对function返回function类型外，其余均返回Object。
而引用类型中的 数组、日期、正则 也都有属于自己的具体类型，而 typeof 对于这些类型的处理，
只返回了处于其原型链最顶端的 Object 类型。因此也不是我们想要的。

typeof function 返回 function

 */

/*  function foo (){
     console.log('xiao')
 }

 console.log(typeof foo) */


// 2 toString
/*
该方法是判断类型最准确的方法
toString() 是 Object 的原型方法(Object.prototype.toString)，调用该方法，默认返回当前对象的 [[Class]] 。这是一个内部属性，其格式为 [object Xxx] ，
其中 Xxx 就是对象的类型。对于 Object 对象，直接调用 toString()  就能返回 [object Object] 。而对于其他对象，
则需要通过 call / apply 来调用才能返回正确的类型信息。 这里要说明一点，虽然所有的对象的原型链最终都指向了Object。
按理说也都应该可以调用toString()方法,但实际上大多数对象都实现了自己的toString()方法。根据原型链的查找规则。对象调用toString时
会首先访问自己实现的该方法。因此必须使用上述方法来让其强制执行Object原型上的toString()方法。*/
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


// 3 constructor

 /* 前面讲到，构造函数的原型对象里面有一个 constructor 属性 ，它指回构造函数本身。因此利用这个属性也可以进行类型判断。
 当我们访问某个对象实例的constructor属性，js会沿着原型链向上查找。即会查找该实例的__proto__属性，通过该属性找到对象原型。
 而对象原型的constructor属性则指向该实例的构造函数。下面举例说明
 */
/*  function Person (){
    this.name = '小明'
 }
const person = new Person()

Person.prototype = {

}

console.log(Person.prototype.constructor)

 */
/* console.log(Person.prototype)
console.log(Person)
console.log(person)
  */
//console.log(person.constructor === Person) // true

/* const arr = [1,2]
console.log(arr.constructor === Array)
console.log(new Error().constructor == Error) */


// console.log(person.constructor)

/* 更多地

...

。null和undefined是无效的对象，因此是不会有constructor存在的
 */





  //4 instanceof
  /* 
  该方法主要用于引用类型的判断
  instanceof 是用来判断 A 是否为 B 的实例，表达式为：A instanceof B，如果 A 是 B 的实例，则返回 true,否则返回 false。
 在这里需要特别注意的是：instanceof 是沿着原型链检测的。即判断B是否在A的原型链上。看下面例子 */

 /* const arr = [1,2]

 console.log(arr instanceof Array) // true
 console.log(arr instanceof Object) // true */

/* 可以发现该方法只能判断两者是否是实例的关系，而不能判断具体类型。
我们知道该方法的实现原理就是判断判断B是否在A的原型链，因此可以手动实现一个instanceof方法
*/
/*  object， array， date， regexp，
function， err */
 // console.log(typeof(null)) // object


 //console.log(Object,Object.prototype)



/* console.log(typeof new Function()) // function
console.log(typeof new Error()) // object
console.log(typeof new RegExp()) // object */


console.log(null.constructor)