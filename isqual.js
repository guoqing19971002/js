/**
 * 1. 实现一个函数，判断两个变量值是否相等
 * 注意
 * - 数据类型不限于示例，尽可能考虑边界
 * - function 引用相等即可
 */
 function fooo (){
  console.log('bar')
}
let t1 = fooo
let t2 = fooo
const foo1 = {
  a: 1,
  b: '1',
  c: NaN,
  d: [
    {
      a: 1,
      b: 2,
    },
  ],
  f: {
    a: 12,
  },
  g: null,
  x: new RegExp(/qwe/),
  h: new Error(123),
  y: function(){
    console.log('123')
  },
  n:undefined,
  m:t1
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
    a: 12,
  },
  g: null,
  x: new RegExp(/qwe/),
  h: new Error(123),
  y: function(){
    console.log('123')
  },
  n:undefined,
  m:t2
};

function isEqual(target1, target2) {
  // 类型不同 直接返回false
  if (typeof target1 !== typeof target2) return false;
  if (target1 instanceof RegExp) {
    return target1.source === target2.source
  }
  if (target1 instanceof Error) {
    return target1.message === target2.message
  }
  // 当函数参与计算时 会转为字符串
  if (target1 instanceof Function) {
    return target1+'' === target2+''
  }
  if (typeof target1 !== "object") {
    // 判断NaN类型 NaN是number类型 转为JSON串判断
    if (typeof target1 === "number" && typeof target2 === "number") {
      return JSON.stringify(target1) === JSON.stringify(target2);
    } else {
      return target1 === target2;
    }
  }
  else {
    // null 也是'object'类型
    if (target1 === null) return target2 === null
    const attrList = Object.keys(target1);
    // 属性数量不同 直接返回false
    if(attrList.length !== Object.keys(target2).length) return false
    for (let i = 0; i < attrList.length; i++) {
      // 递归判断
      const res = isEqual(target1[attrList[i]], target2[attrList[i]]);
      if (!res) {
        // 返回不同的属性
        console.log(attrList[i]);
        return false;
      }
    }
  }
  return true;
}

const obj1 = {
  a: 1,
  b: {
    name: 123,
  },
};

const obj2 = {
  a: 1,
  b: {
    name: 123,
  },
};
const fn1 = new RegExp();
const fn2 = new RegExp();

console.log(isEqual(foo1, foo2))

// console.log(typeof NaN)

