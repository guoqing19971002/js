/* function sum(arr) {
  if (arr.length === 0) return 0;
  return arr.shift() + sum(arr);
} */

function sum(arr, i = 0) {
  if (i === arr.length) return 0;
  return arr[i] + sum(arr, i + 1);
}

console.log(sum([1, 2, 3]));
