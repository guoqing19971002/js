var object = { a: [{ b: { c: 3 } }] }; // path: 'a[0].b.c'
var array = [{ a: { b: [1] } }]; // path: '[0].a.b[0]'

function getValue(target, valuePath, defaultValue) {
  let arr = ["[", "]", "."];
  let path = valuePath.split("");
  path = path.filter((i) => !arr.includes(i));
  // console.log(path)
  let res = target;
  while(path.length){
      const e = path.shift()
      if(! res[e]) return defaultValue
      res = res[e]
  }
  return res
  /* if (Array.isArray(target)) {
    while (path.length) {
      if (res[path.shift()]) {
        res = res[path.shift()];
      } else {
        return defaultValue;
      }
    }
  } else {
    while (path.length) {
      if (res[path.shift()]) {
        res = res[path.shift()];
      } else {
        return defaultValue;
      }
    }
  } */
}

console.log(getValue(object, "a[0].b.c", 0)); // 输出3
console.log(getValue(array, "[0].a.b[0]", 12)); // 输出 1
console.log(getValue(array, "[0].a.b[0].c", 12)); // 输出 12
