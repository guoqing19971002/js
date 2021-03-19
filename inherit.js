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