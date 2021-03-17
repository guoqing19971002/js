Array.prototype.myMap = function (fn) {
  let arr = this.reduce((pre, cur) => {
    //console.log(cur)
    // 定义fn时不能使用箭头函数否则无法绑定this
    // 不能使用push
    return pre.concat(fn.call(cur, cur));
  }, []);
  return arr;
};
const arr1 = [
  {
    num: 1,
  },
  {
    num: 2,
  },
  {
    num: 3,
  },
];
let arr2 = [1, 2, 3];
function double2(num) {
  return num * 2;
}
function double1() {
  this.num = this.num * 2;
}
console.log(
  arr1.myMap(function () {
    return double1.call(this);
  })
);

console.log(
  arr2.myMap(function (i) {
    return double2(i);
  })
);

console.log(arr1);
