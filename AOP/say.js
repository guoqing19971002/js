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
  
});

newSleep("小米");
