function fn() {
  return 20;
}
console.log(fn + 10); // 输出结果 function fn() { return 20 }10

function fn() {
  return 20;
}
fn.toString = function () {
  return 30;
};

console.log(fn + 10); // 40

function fn() {
  return 20;
}
fn.valueOf = function () {
  return 60;
};

console.log(fn + 10); // 70

function fn() {
  return 20;
}
fn.valueOf = function () {
  return 50;
};
fn.toString = function () {
  return 30;
};

console.log(fn + 10); // 60
