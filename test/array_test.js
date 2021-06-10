function test(arr) {
  let i = 0;
  let res = [];
  while (i < arr.length) {
    if (arr[i] + 1 === arr[i + 1]) {
      // console.log(arr[i]);
      let _res = [];
      _res = [..._res, arr[i], arr[i + 1]];
      i++;
      while (arr[i] + 1 === arr[i + 1]) {
        _res.push(arr[i + 1]);
        i++;
      }
      res.push(_res);
    } else {
      i++;
    }
  }
  return res;
}

console.log(test([1, 2, 3, 5, 7, 8]));
