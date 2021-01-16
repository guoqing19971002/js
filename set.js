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

/*  ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。 
他是一个构造函数，可以用来生成set结构 
*/

const s = new Set()
const arr = [2, 3, 5, 4, 5, 2, 2]

arr.forEach(x => s.add(x));

console.log(s) // { 2, 3, 5, 4 }  Set 结构不会添加重复的值。

// 构造函数也可以接受一个数组作为参数来初始化


// set实例属性
 // Set.prototype.constructor //构造函数，默认就是Set函数。
 // Set.prototype.size // 返回Set实例的成员总数。

 // set实例方法 分为两类 一类用于操作数据 一类用于遍历成员

 /* 第一类 */
// 1.add 添加成员 返回set本身

 /* const foo = s.add(6)
 console.log(foo) */

// 2.delete 删除某个值 返回布尔值

/* const res = s.delete(3)
console.log(res,s) */

// 1.has 是否包含成

console.log(s.has(2))

// 2.clear 清空所有成员


// Array.from方法可以将 Set 结构转为数组。 Array.from(new Set(array))

/*第二类 遍历方法 Set的遍历顺序就是插入顺序 */

// keys() 返回键名 values()返回键值 由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以两个方法的行为完全一致
// entries()返回键值对 forEach()使用回调函数遍历 与数组的该方法行为一致

// ...和for of 适用于set结构

// 数组的方法可以间接用于set 因为set构造函数可以接受一个数组 因此可以调用完数组方法的数组传入set构造函数

/* weakSet
该结构与set基本一致，不同点有两个 
1.WeakSet 的成员只能是对象（type of 为object的值）
2.WeakSet 中的对象都是弱引用 垃圾回收机制不考虑weakSet的引用。
 */

 