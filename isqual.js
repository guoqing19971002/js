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
    a: 12,
  },
  g: null,
  x: new RegExp(/qwe/),
  h: new Error(123),
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
};

function isEqual(target1, target2) {
  if (typeof target1 !== typeof target2) return false;
  if (target1 instanceof RegExp) {
    return target1.source === target2.source
  }
  if (target1 instanceof Error) {
    return target1.message === target2.message
  }
  if (typeof target1 !== "object") {
    if (typeof target1 === "number" && typeof target2 === "number") {
      return JSON.stringify(target1) === JSON.stringify(target2);
    } else {
      return target1 === target2;
    }
  }
  // 对象不能用序列化判断 只能序列化一层
  else {
    if (target1 === null) {
      return target2 === null;
    }
    const attrList = Object.keys(target1);
    for (let i = 0; i < attrList.length; i++) {
      const res = isEqual(target1[attrList[i]], target2[attrList[i]]);
      if (!res) {
        console.log(attrList[i]);
        return false;
      }
      // console.log(i)
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

console.log(isEqual(foo1, foo2));
