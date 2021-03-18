/*
扁平化 可以指定扁平化层数
*/

Array.prototype.myFlat = function (n) {
  function flat(level, arr) {
    if (n && level === n) return arr;
    return arr.reduce((pre, cur) => {
      return pre.concat(Array.isArray(cur) ? flat(level + 1, cur) : cur);
    }, []);
  }
  return flat(0, this);
};

const arr = [1, 2, [3, 4], [5, [6, [7, 8]]]];

console.log(arr.myFlat(3,arr));
