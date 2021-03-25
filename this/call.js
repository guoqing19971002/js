const obj1 = {
    name:'小明'
}
function foo (age){
    console.log(this.name + '的年龄是'+  `${age}`)
}
foo.__proto__.myCall = function (){
    //const obj = Array.prototype.slice.call(arguments)[0]
    /* obj为非对象类型时需要转换为对象
    
     if (thisObjType === 'number') {
       thisObj = new Number(thisObj)
      } else if (thisObjType === 'string') {
        thisObj = new String(thisObj)
      } else if (thisObjType === 'boolean') {
        thisObj = new Boolean(thisObj)
      }*/
    //const params = Array.prototype.slice.call(arguments).splice(1)
    let args = [...arguments]
    const obj = args.shift()
    const params = args
    const fun = Symbol('fun')
    obj[fun] = this
    const result = obj[fun](params)
    delete obj[fun]
    return result
} 
foo(18)
foo.myCall({
  name:'xiaom'
},18)