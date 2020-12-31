

const myInstanceof = (left, right) => {
    // 基本数据类型都返回false
    if (typeof left !== 'object' || left === null) return false;
    let leftProto = Object.getPrototypeOf(left);
    let rightProto = Object.getPrototypeOf(right)
    /* while (true) {
      if (proto === null) return false; // 直到找到原型链顶端
      if (proto === right.prototype) return true; // 原型链中有任何一个与右边相等则返回true
      proto = Object.getPrototypeOf(proto);
    } */
    console.log('左原型',leftProto)
    console.log('右原型',rightProto)
    while(leftProto)
    {
       if(leftProto === rightProto) return true

       leftProto = Object.getPrototypeOf(leftProto)

       console.log(leftProto,'循环中')
    }

    return false
  }

  const arr = [1,2]
  console.log(myInstanceof(arr,Array))