/* 数据响应化 */
/* const a = 1
let keys = Object.keys(a)
console.log(keys[0]) */

const obj = {
  age: 18,
};

function defineReactive(obj, key, value) {
  Object.defineProperty(obj, key, {
    get() {
      console.log("get");
      return value;
    },
    set(newValue) {
      console.log("set" + newValue);
      value = newValue;
    },
  });
}

defineReactive(obj, "age", obj["age"]);

obj.age = 19;
console.log("gsfsdf");
