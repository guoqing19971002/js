let count = 10;
function fn1(){
    let count = 0;
    function fn2 (){
        count++
        console.log(count)
    }
    return fn2
}

let result1 = fn1()
let result2 = fn1()
result1();
result2();