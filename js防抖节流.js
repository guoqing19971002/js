// 防抖概念 短时间内多次触发同一操作 只执行最后一次
// 应用场景 表单输入验证 多次触发ajax
// 核心思想 1.通过定时器延迟执行。 2.再次触发时，清除定时器并开启新的定时器。

let timer = null;

function debounce(fn, delay, immediate = false) {
  return function (...args) {
    // 清除定时器
    if (timer) clearTimeout(timer);

    // 首次立即执行 执行完开启定时器占地方 否则第二次仍会立即执行
    if (immediate && !timer) {
      fn(...args);

      timer = setTimeout(() => {
        timer = null;
      }, delay);

      return;
    }

    timer = setTimeout(() => {
      fn(...args);

      timer = null;
    }, delay);
  };
}

// 节流概念  短时间内触发同一函数 限定时间段内只执行一次
// 应用场景 编辑器语法校验 表单输入联想 resize/scroll/touch/mouseove 事件
// 核心思想 利用当前触发时间与上次执行的时间差来限制执行次数

// trailing 最后一次是否执行
function throttle(fn, interval, trailing = false) {
  return function (...args) {
    if (timer) clearTimeout(timer); // 清除最后一次的定时器

    const now = new Date();

    // 节流函数第一次一定会执行
    if (now - previous > interval) {
      fn(...args);
      previous = now;
    } else if (trailing) {
      // 若间隔时间未到,则进入最后一次的定时器。若该定时器延时期间未再次触发，将执行最后一次。若再次触发，则会清除该定时器。

      timer = setTimeout(() => {
        fn(...args);
        previous = 0;
        timer = null;
      }, interval);
    }
  };
}

// 防抖函数 最后一次一定会执行 可控制第一次是否立即执行
// 节流函数 第一次一定会执行  可控制最后一次是否执行
