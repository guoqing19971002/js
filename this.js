/* const obj1 = {
    a:10
}
function foo(){
    this.a = 20
    console.log(this.a)
}
 */
/* {}不会形成作用域 */

/* demo1 */
/* var a = 20;
function fn() {
  console.log(this.a);
}
fn(); */

/* demo2 */
/* function fn() {
    this.a = 20
  function foo() {
    console.log(this.a);
  }
  foo();
}
fn(); */
/* demo3 */
var a = 20;
var obj = {
  a: 10,
  c: this.a + 20,
  fn: function () {
    return this.a;
  }
}

console.log(obj.c);
console.log(obj.fn());