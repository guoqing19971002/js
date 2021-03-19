function isObject(obj) {
  // null、对象、数组返回的都是object类型
  return typeof obj === "object" && obj !== null;
}

function DeepClone(obj, map = new Map()) {
  if (!isObject(obj)) {
    return obj;
  }
  let _obj = Array.isArray(obj) ? [] : {};
  // 之前已经拷贝过该属性 直接返回 避免循环递归
  if (map.has(obj)) return map.get(obj);
  // 未拷贝过 添加到字典中
  map.set(obj, _obj);
  // 获取源对象所有属性描述符
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  // 获取源对象所有的 Symbol 类型键
  let symKeys = Object.getOwnPropertySymbols(obj);
  // 拷贝 Symbol 类型键对应的属性
  if (symKeys.length) {
    symKeys.forEach((symKey) => {
      _obj[symKey] = DeepClone(obj[symKey], map);
    });
  }
  // 拷贝不可枚举属性,Object.create创建的对象 没有原型对象的属性 因此要放在拷贝可枚举属性的前面
  _obj = Object.create(Object.getPrototypeOf(_obj), allDesc);
  // 拷贝可枚举属性（包括原型链上的）
  for (let key in obj) {
    // 每次递归调用时传入该字典
    _obj[key] = DeepClone(obj[key], map);
  }
  return _obj;
}

let sym = Symbol("Symbol");
let obj1 = {
  name: "xiaom",
};
let obj2 = {
  a: 1,
};
obj2[sym] = "aaa";
// 将obj1接入obj2的原型链
Object.setPrototypeOf(obj2, obj1);
// 数据描述符
Object.defineProperties(obj2, {
  foo: {
    writable: false,
    enumerable: false, // 是否可枚举
    configurable: false,
    value: "obj", // 不能有存取器同时使用
  },
  arr: {
    get() {
      console.log("调用了get");
      return [1, 2, 3];
    },
    set(val) {
      console.log("调用了set");
    },
  },
});

console.log(obj2.foo);
let cloneObj = DeepClone(obj2);
console.log(cloneObj.arr);
