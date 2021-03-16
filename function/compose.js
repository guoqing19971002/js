/*
 * @Author: your name
 * @Date: 2021-03-15 19:26:50
 * @LastEditTime: 2021-03-16 11:04:47
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \js\function\compose.js
 */
const compose = (...funcs) => {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    // 单元素数组时调用reduce，会直接返回该元素，不会执行callback;所以这里手动执行
    return funcs[0];
  }
  return funcs.reduce((pre, cur) => {
    return (...args) => {
      return pre(cur(...args));
    };
  });
};

/* function compose(...funcs) {
    //没有传入函数参数，就返回一个默认函数（直接返回参数）
    if (funcs.length === 0) {
      return arg => arg
    }
  
    if (funcs.length === 1) {
    // 单元素数组时调用reduce，会直接返回该元素，不会执行callback;所以这里手动执行
      return funcs[0]
    }
    // 依次拼凑执行函数
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
  } */

let a = (x, y) => x + y,
  b = (x) => x * x,
  c = (x) => (x+1);

console.log(compose(c, b, a)(2, 2)); // 17
/* 
执行过程
1  reduce 返回为  (args) => { c(b(args)) } 也即下一次循环的pre
2  pre为 (args) => { c(b(args)) } 是个函数 本次循环返回为 (args)=>{c(b(a(args)))}
3  循环完成 函数返回值为(args)=>{c(b(a(args)))}
4 最后调用函数 传入12最终为c(b(a(1,2)))
*/
