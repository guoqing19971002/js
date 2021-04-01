/* function sleep(time){
    return new Promise(function(resolve,reject){    
        setTimeout(()=>resolve('over'),time);
    });
}

async function run(time){
    let result = await sleep(time);
    console.log(result);
}

run(3000); */

function sleep(interval) {
  return new Promise((resolve) => {
    setTimeout(resolve, interval);
  });
}

// 用法
async function one2FiveInAsync() {
  for (let i = 1; i <= 5; i++) {
    console.log(i);
    await sleep(1000);
  }
  console.log("asd");
}

const arr = [1, 2, 3, 4, 5];

/* arr.forEach(async (i) => {
  console.log(i);
  await sleep(1000);
}); */

/*
forEach循环相当于给每个元素注册一个函数并执行 该函数的执行不影响循环的进行
for循环 要等循环体内的代码执行完在进行循环 因此可以做到睡眠
 */
(async function (params) {
  for (let i of arr) {
    console.log(i);
    await sleep(500);
  }
  console.log("asd");
})();

// one2FiveInAsync();
