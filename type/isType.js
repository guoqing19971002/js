// 这是一个通用的类型判断方法
function ifType(val) {
  let type = typeof val;
  if (type !== "object") {
    // 先进行typeof判断，如果是基础数据类型，直接返回
    return type;
  }
  // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
  return Object.prototype.toString
    .call(val)
    .replace(/^\[object (\S+)\]$/, "$1");
}


console.log(ifType(1))
console.log(ifType('2'))
console.log(ifType({name:'123'}))
console.log(ifType([1,2,3]))
console.log(ifType(()=>{console.log('123')}))