function mySetInterval(fn, time) {
  setTimeout(() => {
    fn();
    mySetInterval(fn, time);
  }, time);
}

let flag = mySetInterval(() => {
  console.log("foo");
}, 1000);

