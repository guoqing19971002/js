/*
完成函数 createModule，调用之后满足如下要求：
1、返回一个对象
2、对象的 greeting 属性值等于 str1， name 属性值等于 str2
3、对象存在一个 sayIt 方法，该方法返回的字符串为 greeting属性值 + ', ' + name属性值

function () {     
    var o = createModule('hello', 'matt');
     o.name = 'katniss';     
     o.greeting = 'hi';    
      return o.sayIt(); }
 */

function createModule(str1, str2) {
  let _str1 = str1;
  let _str2 = str2;
  let obj = {
    sayIt: function () {
      return `${this.greeting},${this.name}`;
    },
  };
  Object.defineProperty(obj, "greeting", {
    get() {
      return _str1;
    },
    set(newValue) {
      _str1 = newValue;
    },
  });
  Object.defineProperty(obj, "name", {
    get() {
      return _str2;
    },
    set(newValue) {
      _str2 = newValue;
    },
  });

  return obj;
}

let obj = createModule("123", "xiaom");
console.log(obj.sayIt());
