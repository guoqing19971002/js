/**
 * 问题 3
 * 将一天24小时按每半小划分成48段，我们用一个位图表示选中的时间区间，例如`110000000000000000000000000000000000000000000000`，
 * 表示第一个半小时和第二个半小时被选中了，其余时间段都没有被选中，也就是对应00:00~01:00这个时间区间。一个位图中可能有多个不连续的
 * 时间区间被选中，例如`110010000000000000000000000000000000000000000000`，表示00:00-1:00和02:00-02:30这两个时间区间被选中了。
 *
 * 要求：写一个函数timeBitmapToRanges，将上述规则描述的时间位图转换成一个选中时间区间的数组。
 * 示例输入：`"110010000000000000000000000000000000000000000000"`
 * 示例输出：`["00:00~01:00", "02:00~02:30"]`
 */
function timeBitmapToRanges(str) {
  let obj = new Map();
  let arr = str.split("");
  let res = [];
  let i = 0;
  // 求出所有1的位置和连续1的长度
  while (i < arr.length) {
    if (arr[i] === "1") {
      let len = 1;
      let _index = i + 1;
      while (arr[_index] === "1") {
        len++;
        _index++;
      }
      obj.set(i, len);
      i += len;
    } else {
      i++;
    }
  }
  
  function getTime(value) {
    let h = value % 2;
    if (h === 0) {
      // 取整
      let z = value / 2;
      if (z < 10) {
        return `0${z}:00`;
      } else {
        return `${Math.floor(z / 10)}${z % 10}:00`;
      }
    } else {
      let z = Math.floor(value / 2);
      if (z < 10) {
        return `0${z}:30`;
      } else {
        return `${Math.floor(z / 10)}${z % 10}:30`;
      }
    }
  }

  for (let value of obj.keys()) {
    res.push(`${getTime(value)}~${getTime(value + obj.get(value))}`);
  }
  console.log(obj);
  return res;
}

console.log(
  timeBitmapToRanges("110010000000000000000000000000000000000000000000")
);
console.log(
  timeBitmapToRanges("110011000000110000000000000000000000000000001111")
);
