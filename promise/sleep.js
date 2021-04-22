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
  
}

const arr = [1, 2, 3, 4, 5];

// one2FiveInAsync()
/* arr.forEach(async (i) => {
  console.log(i);
  await sleep(1000);
}); */

/*
// await会使得当前上下文的状态暂存
 */
/* (async function (params) {
  for (let i of arr) {
    console.log(i);
    await sleep(500);
  }
  console.log("asd");
})(); */

// one2FiveInAsync();
