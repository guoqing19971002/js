const arr = ['322','20','1111','2']
// 升序
/* function sortNum (a,b){

    return a-b

} */
/* arr.sort(sortNum)

console.log(arr) */


//降序
function sortNum (a,b){

    return b-a
}

arr.sort(sortNum)

console.log(arr)