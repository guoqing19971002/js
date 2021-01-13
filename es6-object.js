// Object.is() 比较两个值是都严格相等
// 与 === 基本一致 区别于以下两点

console.log(Object.is(+0,-0)) // false
console.log(Object.is(NaN,NaN)) // true

// Object.assign() 对象合并 浅拷贝


//Object.getOwnPropertyDescriptors()  返回指定对象所有自身属性（非继承属性）的描述对象。

//Object.keys() 返回所有可遍历的键名 Object.values() 返回所有可遍历的键值，会过滤属性名为 Symbol 值的属性
// Object.entries() 返回可遍历的键值对数组