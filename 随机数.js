
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
setInterval(() => {
    console.log(random(10,100))
}, 200);