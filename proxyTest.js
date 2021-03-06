let cb = null;
const targetMap = new WeakMap();
// 数据响应化
function observe(obj) {
  if (typeof obj !== "object") {
    return obj;
  }
  return new Proxy(obj, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      collect(target, key);
      return typeof obj === "object" ? observe(res) : res;
    },
    set(target, key, val, receiver) {
      const res = Reflect.set(target, key, val, receiver);
      update(target, key);
      return res;
    },
  });
}
// 依赖收集
function collect(target, key) {
  const effect = cb;
  if (effect) {
    let depMap = targetMap.get(target);
    if (!depMap) {
      depMap = new Map();
      targetMap.set(target, depMap);
    }
    let deps = depMap.get(key);
    if (!deps) {
      deps = new Set();
      depMap.set(key, deps);
    }
    deps.add(effect);
  }
}
// 侦听执行
function update(target, key) {
  const depMap = targetMap.get(target);
  if (!depMap) {
    return;
  }
  const deps = depMap.get(key);
  deps.forEach((dep) => dep());
}

function watchEffect(fn) {
  cb = fn;
  fn();
  cb = null;
}