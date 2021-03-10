/*
 * @Author: your name
 * @Date: 2020-11-14 15:26:47
 * @LastEditTime: 2021-03-09 10:16:08
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \js\deepClone.js
 */
/* js基本数据类型与引用数据类型与深浅拷贝*/
/* 1.栈，队列，堆 */
/* 2.基本数据类型与引用数据类型
    js中有6种基本数据类型,Number、String、Boolean、Null、 Undefined以及es新增的Symbol
    基本数据类型是直接存放在栈中的简单数据段，单独分配内存空间，可以按值访问。
    而相对的引用数据类型（Object）的值由于大小不固定，因此存放在堆内存中，按引用访问。
    即我们不能直接操作堆内存中的值，在操作对象时，实际操作的是对象的引用而不是存在堆中的值。
    所谓引用，可以理解为与存在堆中的每个值相对应的一个地址，通过该地址我们可以找到这个值。
  3.变量的复制
    基本类型的复制，系统会为新声明的变量分配内存，这意味着赋值完成后，复制与被复制的变量除了值一样外，毫无关系。
    而引用对象则不同，其复制只是引用的复制，即新的值也是一个指针，它同样指向堆内存中的值。两个指针尽管相互独立，
    但他们指向的值确是一样的。因此当通过其中一个指针改变堆内存中的值，另一个指针的值也会发生变化。
    下面通过例子印证一下。
  
 */

// let a = 2
// let b = a
// b = 3
// console.log(a,b) //2,3
// let obj1 = {
//     name:'小明',
//     age:18
// }
// let obj2 = obj1
// obj2.name = '小红'
// console.log(obj1) // { name: '小红', age: 18 } */

// {} = {} [] = [] false
/* const obj = {
  a:1,
  b:{
    c:2
  }
}
let target = {}
Object.assign(target,obj)
console.log(target) // { a: 1, b: { c: 2 } }
obj.a = 11
obj.b.c = 3
console.log(target) // { a: 1, b: { c: 3 } } */
// 并不是普通的对象复制 即直接把指针赋值 而是在内存中创建了第一层级
// 第二层级时普通类型 改变不受影响 引用类型则还是指针的复制
/* const sym = Symbol('haha')
obj[sym] = '111'
Object.keys(obj).forEach(key => {
  console.log(key)
})
console.log(obj)
Reflect.ownKeys(obj).forEach(key => { // 该方法可以访问symbol类型
  console.log(key)
})
 */

/*  const arr = [1,2,3]

 Reflect.ownKeys(arr).forEach(key => {
   console.log(arr[key])
 }) */

/* deepclone */

/* const obj1 = {
  a:1,
  b:{
    c:2
  }
}
obj1[sym] = 111 */

/* function isObject(obj) { // null、对象、数组返回的都是object类型
  return (typeof obj === 'object' || typeof obj === 'function') && obj !== null
} */
/* function DeepClone(obj){

  if (!isObject(obj)) {
    throw new Error('obj 不是一个对象！')
  }
  
  const _obj = Array.isArray(obj)? []:{}

  Reflect.ownKeys(obj).forEach(key => {

    _obj[key] = isObject(obj[key])? DeepClone(obj[key]) : obj[key] 

  })

  return _obj

} */

/* const obj2 = DeepClone(obj1)

obj1.b.c = 4

console.log(obj1,obj2) */
/* let arr1 = [1,2,{
  a:1
}]
let arr2 = DeepClone(arr1)
arr1[2].a = 3

console.log(arr1,arr2) */
/* function shallowClone (obj){

  if (!isObject(obj)) {
    throw new Error('obj 不是一个对象！')
  }
  
  const _obj = Array.isArray(obj)? []:{}

  Reflect.ownKeys(obj).forEach(key => {

    _obj[key] = obj[key] 

  })

  return _obj

} */

/* let obj1 = {
  a:1,
  b:{
    c:2
  }
} */
/* let arr1 = [1,2,{
  a:3
}]

let arr2 = DeepClone(arr1) */

/* arr1[2].a = 4
arr2[2].a = 5 */
//console.log(arr1,arr2) // [ 1, 2, { a: 4 } ] [ 1, 2, { a: 5 } ]
//console.log(obj1,obj2) // { a: 1, b: { c: 4 } } { a: 1, b: { c: 5 } }
//可以看到深拷贝得到的对象 与原对象没有关联

/* let obj = {}
let obj1 = {
  a:1,
  b:2
} */
// let sym = Symbol('Symbol')
/* obj1[sym] = 111

obj = shallowClone(obj1)

console.log(obj1,obj) // { a: 1, b: 2, [Symbol(Symbol)]: 111 } { a: 1, b: 2, [Symbol(Symbol)]: 111 }

console.log(obj1 === obj) // false */

/* let arr1 = [1,2,{
  a:3
}]
let arr2 = DeepClone(arr1)
arr1[2].a = 4
console.log(arr2)
arr2[5] = 6
console.log(arr2)
 */

/* let obj1 = {
  a:1,
  b:{
    c:2
  }
}
let obj2 = DeepClone(obj1)

obj1.b.c = 4

console.log(obj2) */

/* function DeepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

let obj1 = {
  a:1,
  b:{
    c:2
  },
  f:function(){
    console.log('aaa')
  }
}

let obj2 = DeepClone(obj1)

obj1.f = function(){
  console.log('fff')
}

obj1.b.c = 4
console.log(obj2) // { a: 1, b: { c: 2 } }
obj1.f()
 */
function isObject(obj) {
  // null、对象、数组返回的都是object类型
  return typeof obj === "object" && obj !== null;
}

function DeepClone(obj, map = new Map()) {
  if (!isObject(obj)) {
    return obj;
  }
  const _obj = Array.isArray(obj) ? [] : {};
  // 之前已经拷贝过该属性 直接返回 避免栈移除
  if (map.has(obj)) return map.get(obj);
  // 未拷贝过 添加到字典中
  map.set(obj, _obj);
  Reflect.ownKeys(obj).forEach((key) => {
    // 引用类型，再次浅拷贝，递归即可
    _obj[key] = DeepClone(obj[key], map);
  });
  return _obj;
}
let obj1 = {
  a: 1,
  b: {
    c: 2,
  },
  d: [1, 2, 3],
  f: function () {
    console.log("asd");
  },
};
/* obj1.b.e = obj1.d;
obj1.d.push(obj1.b);
const obj2 = DeepClone(obj1);
console.log(obj2.f);
obj2.f = function () {
  console.log("123");
};
obj1.f(); */

function shallowClone(obj) {
  if (!isObject(obj)) {
    // 该方法判断是不是引用类型
    throw new Error("obj 不是一个对象！");
  }
  const _obj = Array.isArray(obj) ? [] : {};
  // 使用Reflect.ownKeys可以访问symbol类型
  Reflect.ownKeys(obj).forEach((key) => {
    _obj[key] = obj[key];
  });
  return _obj;
}

