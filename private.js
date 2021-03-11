// es5利用闭包实现私有变量
/* function Person() {
  let name = "xiaom";
  this.getName = function () {
    return name;
  };
}

let person = new Person();
console.log(person.name); // undefined
console.log(person.getName()); // xiaom
 */
// es6

/* class Person {
  constructor() {
    var _name = "name";
    this.getName = function () {
      return _name;
    };
  }
}

var foo = new Person();

console.log(foo.getName()); // name
console.log(foo._name); // undefined

缺陷
constructor 的逻辑变得复杂。构造函数应该只做对象初始化的事情，现在为了实现私有变量，必须包含部分方法的实现，代码组织上略不清晰。
方法存在于实例，而非原型上，子类也无法使用 super 调用
 */

// 包一层立即执行函数 解决上述缺点
const Person = (function () {
  let name = "";
  class Person {
    constructor() {
      name = "name";
    }
    getName() {
      return name
    }
  }

  return Person;
})();
var foo = new Person();

console.log(foo.getName()); // name
console.log(foo._name); // undefined
