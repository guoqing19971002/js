const arr1 = [5,4,3,4,5,6,4,4,1,4,4,3,3,3,2]
//const arr2 = new Set(arr1) 数组去重
// console.log(arr2)

// 统计出现次数最多的三个数
const arr2 = []
const arr3 = [0]
arr1.forEach((item,index) => {
    if(!arr2.includes(item))
    {
        arr2.push(item)
        arr3[item] = 1
    }
    else{
        arr3[item]++
    }
})
let arr4 = []
for (const i in arr3)
{
    arr4[i] = arr3[i]
}
arr3.sort().reverse()
console.log(arr4.indexOf(arr3[0]),arr4.indexOf(arr3[1]),arr4.indexOf(arr3[2]))