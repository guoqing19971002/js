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
  // 获取源对象所有的 Symbol 类型键
  let symKeys = Object.getOwnPropertySymbols(obj);
  // 拷贝 Symbol 类型键对应的属性
  if (symKeys.length) {
    symKeys.forEach((symKey) => {
      _obj[symKey] = DeepClone(obj[symKey], map);
    });
  }
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
  arr1:[1,2],
  testObj:{}
};
obj2[sym] = "aaa";
// 将obj1接入obj2的原型链
Object.setPrototypeOf(obj2, obj1);
obj2.testObj.foo = obj2.arr1
obj2.arr1.push(obj2.testObj)


let cloneObj = DeepClone(obj2);
console.log(obj2)
console.log(cloneObj)// { a: 1, name: 'xiaom', [Symbol(Symbol)]: 'aaa' }
//console.log(cloneObj.foo); // obj
//console.log(cloneObj.arr); // [1,2,3]


/*
此时的深拷贝还有待完善, 我们还要考虑以下两个问题
1 Reflect.ownKeys方法不能获取对象原型链上的属性，因此也就无法对其拷贝。
我们知道for..in循环能获取原型链的属性。但又不能拷贝Symbol。
这里我们可以使用Object.getOwnPropertySymbols()方法来获取对象的Symbol类型的属性。
2 我们无法拷贝不可枚举的属性,enumerable为false。要拷贝不可枚举属性，需要用
Object.getOwnPropertyDescriptors()方法得到一个属性描述符集合,结合Object.create方法实现拷贝。
接下来实现
 */