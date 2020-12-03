var a = 20;

function foo() {
  /* foo作用域内声明了a 因此被提升 且为undefined
  所以会被先赋值为100 */
  if (!a) {
    a = 100;
  }
  console.log(a) //100
  var a = 10;
  console.log(a) //10
}
foo()