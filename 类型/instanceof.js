

const myInstanceof = (left, right) => {
    // 基本数据类型都返回false
    if (typeof left !== 'object'&&typeof left !== 'function'||left === null) return false;
    let leftProto = left.__proto__ // 获取左边对象的原型
    let rightProto = right.prototype // 获取右边构造函数的原型
    // 沿着原型链向上查找
    while(leftProto)
    {
       if(leftProto === rightProto) return true
       leftProto = leftProto.__proto__
    }
    return false
  }
  const arr = [1,2]
  const foo = () => {
     console.log('xiaom')
  }
  console.log(myInstanceof(arr,Array)) // true
  console.log(myInstanceof(arr,Object)) // true
  console.log(myInstanceof(foo,Array)) // false
  console.log(myInstanceof(foo,Function)) // true
  console.log(myInstanceof(foo,Object)) // true


console.log(typeof 3) 