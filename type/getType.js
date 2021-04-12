/**
 * @description 通用的类型判断函数
 * @param {*} e
 */
function getType(e) {
  return [...Object.prototype.toString.call(e).slice(7)]
    .filter((i, index, arr) => index !== arr.length - 1)
    .join("");
}

