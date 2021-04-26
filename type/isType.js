// 这是一个通用的类型判断方法
function ifType(val) {
  return Object.prototype.toString
    .call(val)
    .replace(/^\[object (\S+)\]$/, "$1");
}
console.log(ifType(1))
console.log(ifType('2'))
console.log(ifType({name:'123'}))
console.log(ifType([1,2,3]))
console.log(ifType(new RegExp()))
console.log(ifType(()=>{console.log('123')}))