Array.prototype.myFilter = function (fn) {
  let arr = this.reduce((pre, cur) => {
    if (fn(cur)) {
      return pre.concat(cur);
    }
    return pre;
  }, []);
  return arr;
};
const arr = [1, 2, 2, 2, 3, 4, 2, 2, 4, 5, 6];
console.log(
  arr.myFilter((i) => {
    return i !== 2;
  })
);
