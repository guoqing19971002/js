/* let str = 'hello world'
console.log(str.replace(' ',','))
//console.log(typeof str) */

setTimeout(() => { // 任务1
  console.log("1");
}, 1000);
setTimeout(() => { // 任务2
  console.log("2");
}, 1000);
Promise.resolve().then(() => {
  console.log("3");
});
console.log("4");
// 任务1先于任务2执行 js线程不是等1执行完了再执行2。由于2的延时低于1 造成2先打印。