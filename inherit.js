/*
六种继承方式 
 */
// 1 原型链继承
/* function Person() {
  this.name = "xiaopao";
}

Person.prototype.getName = function () {
  console.log(this.name);
};

function Child() {}
Child.prototype = new Person();
var child1 = new Child();
child1.getName(); // xiaopao */
/*
缺点：
引用类型的属性被所有实例共享
在创建Child 的实例时， 不能向Person传参 
 */

/* function Person(){
    this.name = 'xiaopao';
    this.colors = ['red', 'blue', 'green'];
}

Person.prototype.getName = function(){
    console.log(this.name);
}

function Child(){

}

Child.prototype = new Person();
var child1 = new Child();
var child2 = new Child();
child1.colors.push('yellow')
console.log(child2.colors) */

//
function Father(name, age) {
  this.name = name;
  this.age = age;
  this.run = function () {
    console.log("我会跑步");
  };
}
function Son(name, age) {
  Father.call(this, name, age);
}
/*
可以使用Object.create方法创建一个父类原型的副本,其余操作与组合继承一致。
只调用了一次SuperType构造函数
 */
let protoType = Object.create(Father);
Son.protoType = protoType;
protoType.constructor = Son;
Son.prototype.say = function() { // 这是子类的独有方法
    console.log('我是小孩');
}
const p1 = new Son("李四", 10);
console.log(p1.name);
p1.run(); // 我会跑步
p1.say() // 我是小孩
