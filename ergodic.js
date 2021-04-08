/**
 * @description 异步遍历
 */

function muti(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 300);
  });
}

let arr = [1, 2, 3];

/* arr.forEach(async (i) => {
  const res = await muti(i);
  console.log(res);
}) */
/* (
  (async function () {
    for (let i of arr) {
      console.log(await muti(i));
    }
    console.log('asd')
  })()
); */
/* (async function () {
    for (let i in arr) {
      console.log(await muti(arr[i]));
    }
    console.log('asd')
  })() */
(function () {
  for (let i = 0; i < arr.length; i++) {
    muti(arr[i]).then((res) => {
      console.log(res);
    });
  }
  console.log("asd");
})();
console.log("end");