/*
它是一种接口，为各种不同的数据结构提供统一的访问机制。
任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
*/
/*
遍历器对象本质上，就是一个指针对象 
 */

/*
原生具备 Iterator 接口的数据结构如下。
Array
Map
Set
String
TypedArray
函数的 arguments 对象
NodeList 对象 
 */

// let arr = [1,2,3];
// let iter = arr[Symbol.iterator](); // 得到遍历器对象
// console.log(iter.next()) // { value: 1, done: false }
// console.log(iter.next()) // { value: 2, done: false }
// console.log(iter.next()) // { value: 3, done: false }
// console.log(iter.next()) // { value: undefined, done: true }
// Array默认具有Symbol.iterator属性 它是一个函数 返回遍历器对象
// console.log(iter.next())// {value:'a',done:false}

const obj = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]: function () {
    let keys = Object.keys(this);
    let index = 0;
    return {
      next: function () {
        return index < keys.length
          ? {
              value: this[keys[index++]],
              done: false,
            }
          : {
              value: undefined,
              done: true,
            };
      }.bind(this),
    };
  },
};
// obj is not iterable obj没有Symbol.iterator属性 不能进行for of 遍历
// 也就是说遍历器就是供for of 消费的
// 添加Symbol.iterator后就可以遍历了
// 凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。
/* for (value of obj) {
  console.log(value);
} */

console.log([...obj])
console.log([...'str'])
console.log([...new Set([1,2,3])])

/* let it = obj[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
 */

// 类数组对象(具有数值键名和length属性)可以直接使用数组的遍历器
let iterable = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator],
};
for (let item of iterable) {
  // console.log(item); // 'a', 'b', 'c'
}

/* 
  调用遍历器的场合
  1.解构赋值
  2.展开运算符 只要某个数据结构部署了遍历器接口 就可以使用展开运算符转为数组
   */
let str = "xiaom";
// console.log([...str])[("x", "i", "a", "o", "m")];

/*
 3. yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。 
 4. 数组的遍历会调用遍历器接口，因此任何接受数组作为参数的场合，其实都调用了遍历器接口
注意  数组的遍历器接口只返回具有数字索引的属性
 for...of
 Array.from()
 Map(), Set(), WeakMap(), WeakSet() 
 Promise.all()
 Promise.race()
*/

/*
计算生成的数据结构

ES6 的数组、Set、Map 都部署了以下三个方法，调用后都返回遍历器对象。
entries() 返回一个遍历器对象，用来遍历[键名, 键值]组成的数组。
对于数组，键名就是索引值；对于 Set，键名与键值相同。Map 结构的 Iterator 接口，默认就是调用entries方法。
keys() 返回一个遍历器对象，用来遍历所有的键名。
values() 返回一个遍历器对象，用来遍历所有的键值。
 */
// 这就知道为什么map.values()为什么不能跟Object.values()那样forEach了
// 你返回的是遍历器对象,只能用forof遍历 而人家返回的是数组 可以用数组的遍历方法
/* let arr1 = ['a', 'b', 'c'];
for (let pair of arr1.entries()) {
  console.log(pair);
}
 */
/*
不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用Array.from方法将其转为数组。 
 */
