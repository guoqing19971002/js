/*
 * @Author: your name
 * @Date: 2021-02-06 10:24:07
 * @LastEditTime: 2021-02-06 10:28:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \js\AOP\say.js
 */
// 睡觉之前先洗澡

function sleep(name) {
  console.log(name + "睡觉");
}

// 通过扩展原型实现

Function.prototype.before = function (cb) {
  return (name) => {
    cb();
    this(name);
  };
};

let newSleep = sleep.before(() => {
  console.log("洗澡");
});

newSleep("小米");
