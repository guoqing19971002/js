function insert(arr, item, index) {

    let arr1 = arr.slice(0,index)
    let arr2 = arr.slice(index)
    return [...arr1,item,...arr2]
}

console.log(insert([1, 2, 3, 4], 'z', 2))