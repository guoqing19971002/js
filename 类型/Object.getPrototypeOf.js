//Object.getPrototypeOf 返回指定对象的原型

const arr = [1,2]
// console.log(Object.getPrototypeOf(arr),arr.__proto__)

const proto = Object.getPrototypeOf(arr)

console.log(Object.getPrototypeOf(proto),arr.__proto__.__proto__) 

// 通过__proto__一层一层往上找  只有实例才有__proto__ protoType是构造函数的属性