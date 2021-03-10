/* const arr1 = Object.create(Array.prototype)
const arr2 = Object.create(Array.prototype)
arr1.__proto__.foo = function(){
    console.log('bar')
}

//console.log(Array.prototype)

arr2.foo() */


let arr = [];
let array_proto = Object.create( Array.prototype );


array_proto.push= function () {
    let res = Array.prototype.push.apply( this, arguments );
    return res;
    }

arr.__proto__ = array_proto

arr.push(1,2,3)

console.log(arr)


const arr = new Array(1,2,3)
console.log(arr)
arr.__proto__.foo = function(){
    console.log('bar')
}
Array.prototype.foo()