// 多维数组变为一维数组
// es6  flat(depth) 参数为深度 即纬度-1  
// 设置为Infinity 无视纬度直接转换

const arr = [1,[2,3],[4,[5,6,[7,8]]]]

// console.log(arr.flat(2))


// reduce 用递归无视维度展开  concat或展开运算符都可以



function Dimreduc(array){

    let _arr = []

    _arr = array.reduce((res,next) =>{

       Array.isArray(next)?next=Dimreduc(next):null

       res = res.concat(next)
      
          return res
      },[]);

      return _arr

}

const newarr = Dimreduc(arr)

console.log(newarr)