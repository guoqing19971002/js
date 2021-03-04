/* fill方法使用给定值，填充一个数组。 可以指定填充的起始和结束位置*/
// console.log(['a', 'b', 'c'].fill(7))// [7,7,7]

Array.prototype._fill = function (num, i = 0, stn = this) {
  if (i < stn.length) {
    stn[i] = num;
    return stn._fill(num, i + 1, stn);
  }
  return stn;
};

console.log([1, 2, 3]._fill(7));
console.log(new Array(4)._fill(7));
let arr = [1,2,3]
arr._fill(8)
console.log(arr)
