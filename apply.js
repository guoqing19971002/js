const obj1 = {
    name:'小明'
}
function foo (age){
    console.log(this.name + '的年龄是'+  `${age}`)
}
foo.__proto__.myApply= function (){
    const obj = Array.prototype.slice.call(arguments)[0]
    const params = Array.prototype.slice.call(arguments).splice(1)
    /* params非数组时抛出错误 */
    const fun = Symbol('fun')
    obj[fun] = this
    const result = obj[fun](...params)
    delete obj[fun]
    return result
} 
/* foo(18)
foo.myApply(obj1,18) */
foo(18)
foo.myApply(obj1,[18])