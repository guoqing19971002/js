// const obj = {
//     name:'小明'
// }

// function foo(a){

    // a = {} // 不改变  传入的是对象的引用
    // a.name = '小红' // 改变

    // a = {}
    // a.name = '小胖'

    /* 
      立即推 传入的是对象的引用，它指向obj在堆中的值    
    */
// }

// foo(obj)

// console.log(obj)

const a = 10
function foo(b){
  
  b = 20
}
foo()
console.log(a)
