/* reduce() 是数组的归并方法，与forEach()、map()、filter()等迭代方法一样都会对数组每一项进行遍历，
但是reduce() 可同时将前面数组项遍历产生的结果与当前遍历项进行运算。因此可以衍生出很多应用
如数组求和，求最大值，去重，求元素出现次数，数组降维等*/

/* 

arr.reduce(callback,[init])

reduce 为数组中的每一个元素依次执行回调函数，他有四个参数 分别是
1、prev （上一次调用函数返回的值，或者是提供的初始值（initialValue））
2、cur （数组中当前被处理的元素）
3、index （当前元素在数组中的索引）
4、array （调用 reduce 的数组）

init 表示初始值。
*/

const arr = [1,2,2,3,4,4,4,5]

// 求和

const sum = arr.reduce((pre,cur) => {
    return pre+cur
},0) // 传入了初始值0 pre初始值为0

//console.log(sum)  //25

// 最大值

const max = arr.reduce((pre,cur) => {
    return Math.max(pre,cur)
},0)

//console.log(max) // 5

// 元素出现次数

let Statistics = arr.reduce((pre,cur)=>{
  if(cur in pre){  // in 关键字 判断元素是否存在于目标对象/数组 中
    pre[cur]++
  }else{
    pre[cur] = 1 
  }
  return pre
},{})//pre初始值为{}
//console.log(Statistics); //{ '1': 1, '2': 2, '3': 1, '4': 3, '5': 1 }

// 数组去重

let newArr = arr.reduce((pre,cur)=>{
    pre.indexOf(cur) === -1&&pre.push(cur) // 用in会出错
    return pre
  },[])//pre初始值为[]
//console.log(newArr); //[ 1, 2, 3, 4, 5 ]

// 数组降维

const arr1 = [[1,2],[3,4],[5,6]]

let newArr1 = arr1.reduce((pre,cur)=>{
  pre = pre.concat(cur)
  return pre
},[])//pre初始值为[]
console.log(newArr1); //[ 1, 2, 3, 4, 5, 6 ]