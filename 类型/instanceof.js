

const myInstanceof = (left, right) => {
    // 基本数据类型都返回false
    if (typeof left !== 'object' || left === null) return false;
    // Object.getPrototypeOf
    let leftProto = left.__proto__
    let rightProto = right.prototype // 右边传入的是构造函数 因此用protoType
  
    console.log('左原型',leftProto)
    console.log('右原型',rightProto)
    while(leftProto)
    {
       if(leftProto === rightProto) return true

       leftProto = leftProto.__proto__

       console.log(leftProto,'循环中')
    }

    return false
  }

  const arr = [1,2]
  console.log(myInstanceof(arr,Array))
  console.log(arr instanceof Array)