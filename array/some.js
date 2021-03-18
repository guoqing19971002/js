// some  有一个满足条件就返回true  全不满足则返回false
let arr = [1, 2, 3, 5, 6];

let res = arr.some((i) => i > 7);
// console.log(res)

Array.prototype.mySome = function (fn) {
  if (!this.length) return false;
  let flag = false;
  this.forEach((i) => {
    if (fn.call(i, i)) {
      flag = true;
      return;
    }
  });

  return flag;
};

const foo = [
  {
    num: 1,
  },
  {
    num: 5,
  },
];

console.log(
  foo.mySome(function () {
    return this.num > 9;
  })
);
