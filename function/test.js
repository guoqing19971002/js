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

// console.log(add(1)(2)(3) + 10);

function kelihua() {
  let params = [...arguments];
  let add = () => {
    let _add = (...args) => {
      params = [...params, ...args];
      return _add;
    };

    _add.toString = () => {
      return params.reduce((pre, cur) => {
        return pre + cur;
      });
    };

    return _add;
  };
  // 返回add函数的执行 就等于返回了_add函数 也就表明 此后的调用将一直是_add 不管是隐式调用还是传参
  // 传参就继续收集参数  隐式转换就计算结果
  return add();
}

function Add(...args) {
  const _add = (..._args) => {
    args = [...args, ..._args];
    return _add;
  };
  _add.toString = () => {
    return args.reduce((pre, cur) => pre + cur);
  };
  return _add;
}

console.log(Add(1)(2, 3)(4)+2);
