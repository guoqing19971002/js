/* 手先写一个简单的构造函数 */
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function () {
  console.log(this.name);
};
function myNew(fn) {
  /*  首先创建一个空对象，最后会返回这个对象 */
  let myObj = {};

  /* 将新对象的对象原型指向构造函数的原型对象 */
  myObj.__proto__ = fn.prototype;

  /* 接下来需要执行构造函数的代码,并将this指向新创建的对象。arguments是个伪数组，第一个参数是构造函数。
    剩下的参数是需要传入构造函数的参数,经过如下处理，params中存入的是构造函数需要的参数，且是一个真数组
    */
  const params = Array.prototype.slice.call(arguments).splice(1);

  /* 通过apply改变this指向，并执行构造函数获得其执行结果 */
  const res = fn.apply(myObj, params);

  /* 如果构造函数返回值是对象则返回该对象，否则返回自己创建的对象 */
  return res && (typeof result === "object" || typeof result === "function")
    ? res
    : myObj;
}
/* 对比一下new关键字和自己写的myNew */
const p1 = new Person("二牛", 18); //Person { name: '二牛', age: 18 }
const p2 = myNew(Person, "铁柱", 20); // Person { name: '铁柱', age: 20 }
console.log(p1, p2);
p1.say(); // 二牛
p2.say(); // 铁柱
