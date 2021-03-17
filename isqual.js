/*
 * @Author: your name
 * @Date: 2021-03-16 18:38:28
 * @LastEditTime: 2021-03-16 20:19:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \js\isqual.js
 */
/**
 * 1. 实现一个函数，判断两个变量值是否相等
 *
 * 注意
 * - 数据类型不限于示例，尽可能考虑边界
 * - function 引用相等即可
 */
 const foo1 = {
    a: 1,
    b: "1",
    c: NaN,
    d: [
      {
        a: 1,
        b: 2,
      },
    ],
    f: {
      a: 1,
    },
    g: null,
    f:new RegExp(/qwe/),
    h:new Error(123)
  };
  
  const foo2 = {
    a: 1,
    b: "1",
    c: NaN,
    d: [
      {
        a: 1,
        b: 2,
      },
    ],
    f: {
      a: 2,
    },
    g: null,
    f:new RegExp(/qwe/),
    h:new Error(123)
  };
  
  function isEqual(target1, target2) {
    if(typeof target1!==typeof target2) return false
    if(typeof target1!=='object'){
        return  JSON.stringify(target1)  === JSON.stringify(target2)  
    }
    // 对象不能用序列化判断 只能序列化一层
    else {
      if(target1 === null){
        return target2 === null
      }
        Object.keys(target1).forEach(key => {
            isEqual(target1[key],target2[key])
        })
    }
    return true

  }

  const obj1 = {
      a:1,
      b:{
          name:'123'
      }
  }

  const obj2 = {
    a:1,
    b:{
        name:'123'
    }
}
const fn1 = new RegExp()
const fn2 = new RegExp()

console.log(isEqual(foo1,foo2))

