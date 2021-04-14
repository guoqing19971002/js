function Person() {
  this.name = "xiaom";
  this.age = 18;
}
Person.prototype.say = function () {
  console.log(this.name);
};
// 这是将类实例化 而不是继承 继承是类继承类
// let son1 = new Person();
/* console.log(son1.age);
son1.say(); */

// 组合式继承
function Son() {
  Person.call(this);
}
Son.prototype = new Person();
Son.prototype.constructor = Son;
/* const s1 = new Son()
s1.say() */

// 寄生组合式继承
function Son1() {
  Person.call(this);
}
Son1.prototype = Object.create(Person.prototype, {});
Son1.prototype.constructor = Son1;
const s1 = new Son1();
s1.say()
