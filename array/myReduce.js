Array.prototype.myReduce = function (cb, init) {
  // 提供初始值 从0位置开始循环
  // 不提供初始值 位置0作为初始值 从位置1开始循环
  if (init) {
    this.forEach((item, index) => {
      init = cb(init, item, index, this);
    });
  } else {
    init = this.shift();
    this.forEach((item, index) => {
      init = cb(init, item, index, this);
    });
  }

  return init;
};

const arr = [1, 2, 3, 4, 4, 4];
const arr1 = [1, 2, [3, 4], [[5, 6]]];
const arr2 = [1, 2, 22, 2, 2, 2, 2, 3, 4, 4, 4, 5, 5, 2, 77, 8];
const sum = arr.myReduce((pre, cur) => {
  return pre + cur;
});
function merge(arr) {
  return arr.myReduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? merge(cur) : cur);
  }, []);
}

const repeat = arr2.myReduce((pre, cur) => {
  if (!pre.includes(cur)) return pre.concat(cur);
  return pre;
}, []);

console.log(sum); // 20
console.log(merge(arr1)); //[ 1, 2, 3, 4, 5, 6 ]
console.log(repeat);
