/*
Object.create(proto, [propertiesObject]) 创建一个新对象，使用现有对象作为新建对象的原型

proto :新建对象的原型对象，即该参数会被赋值到目标对象(即新对象，或说是最后返回的对象)的原型上。
该参数可以是null， 对象， 函数的prototype属性 （创建空的对象时需传null , 否则会抛出TypeError异常）。

propertiesObject : 可选。 添加到新创建对象的可枚举属性（即其自身的属性，而不是原型链上的枚举属性）对象的属性描述符以及相应的属性名称。
这些属性对应Object.defineProperties()的第二个参数。

返回值：在指定原型对象上添加新属性后的对象。
 */

// 与 new object() 区别

/*
1 创建对象的方式不同
new Object() 通过构造函数来创建对象, 添加的属性是在自身实例下。
Object.create() es6创建对象的另一种方式，可以理解为继承一个对象, 添加的属性是在原型下。
 */

// new Object() 方式创建
var a = { rep: "apple" };
var b = new Object(a);
//console.log(b) // {rep: "apple"}
//console.log(b.__proto__) // {}
//console.log(b.rep) // {rep: "apple"}

// Object.create() 方式创建
// 该方式创建的对象 只是有目标对象的方法 没有属性 需要手动添加
// 但访问属性是能访问到的 因为会沿着原型链查找

let c = Object.create(a);
// console.log(c);
// console.log(c.rep);

/*
创建对象属性的性质不同 
 */
// Object.create() 用第二个参数来创建非空对象的属性描述符默认是为false的，
// 而构造函数或字面量方法创建的对象属性的描述符默认为true。
/* let o = Object.create({}, { p: { value: 42 } });
console.log(o) // {}
console.log(o.p) // 42
o.q = 12
console.log(Object.keys(o)) // {q}
 */

/*

3 创建空对象时不同 
当用构造函数或对象字面量方法创建空对象时，对象时有原型属性的，即有_proto_;
当用Object.create()方法创建空对象时，对象是没有原型属性的。
 */

/*
4 __proto__ 属性

Object.create() 等同于将新建对象的proto指向目标对象

 */

/* function Person (){
    this.name = "xiaom"
}

const person1 = Object.create(Person)
console.log(person1.__proto__ === Person) // true */

// 相比new关键字少了执行构造函数这一步 因此新建对象上没有目标对象的属性

/*
Object.setPrototypeOf
描述：该方法的作用与 __proto__ 相同，用来设置一个对象的 prototype 对象，返回参数对象本身。
它是 ES6 正式推荐的设置原型对象的方法。 
Object.setPrototypeOf(object, prototype)
 */

const obj1 = {
  a: 1,
  b: "xiaom",
};

const obj2 = Object.create(obj1, {
  c: {
    value: 3,
  },
  d: { value: 4 },
});
console.log(obj2);
