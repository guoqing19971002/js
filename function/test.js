function add(a, b, c, d) {
  return a + b + c + d;
}

/**
 * @description 将参数数量固定的函数柯里化,可多次传入参数
 * @param {func} fn
 */
function curry(fn) {
  let params = [];
  const next = (...args) => {
    params = [...params, ...args];
    // 函数的length属性代表传入的形参的个数 即必传参数
    if (params.length < fn.length) return next;
    else return fn.apply(fn, params);
  };
  return next;
}

const newFn = curry(add);
// console.log(newFn(1)(2)(3,4))

/**
 * @description 无限参数函数的柯里化
 * @param {*} params
 */
function add() {
  let params = [...arguments];
  // 利用闭包的特性保存_args并收集所有的参数值
  let adder = () => {
    let _adder = function () {
      params = [...params, ...arguments];
      return _adder;
    };
    // 利用隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
      return params.reduce(function (a, b) {
        return a + b;
      });
    };
    return _adder;
  };
  return adder();
}

/* function add() {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  var _args = [].slice.call(arguments);

  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  var adder = function () {
    var _adder = function () {
      // [].push.apply(_args, [].slice.call(arguments));
      _args.push(...arguments);
      return _adder;
    };

    // 利用隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
      return _args.reduce(function (a, b) {
        return a + b;
      });
    };

    return _adder;
  };
  // return adder.apply(null, _args);
  return adder(..._args);
} */
console.log(add(1)(2)(3) + 10);
