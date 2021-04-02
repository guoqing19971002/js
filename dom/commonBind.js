/*
通用的事件绑定处理函数 能够处理事件代理 
*/
function bindEvent(elem, type, selector, fn) {
  if (fn == null) {
    fn = selector;
    selector = null;
  }
  elem.addEventListener(type, function (e) {
    var target;
    // 如果存在选择器 说明是事件代理
    // 传入selector的意义在于精确监听 即只监听selector的元素
    // 因此要知道触发事件的元素 而不是绑定事件的元素  所以用e.target
    // e.currentTarget返回的是绑定时间的元素 一般是用于普通的事件监听而不是事件代理
    if (selector) {
      target = e.target;
      if (target.matches(selector)) {
        fn.call(target, e);
      }
    } else {
      fn(e);
    }
  });
}
