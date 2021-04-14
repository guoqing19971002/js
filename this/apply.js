const obj1 = {
    name:'小明'
}
function foo (age){
    console.log(this.name + '的年龄是'+  `${age}`)
}
foo.__proto__.myApply= function (){
    //获取this要指向的对象
    const args = [...arguments]
    const obj = args[0]
    const params = args[1]
    if(!Array.isArray(params)) throw 'not array'
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