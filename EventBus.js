class EventBus {
  constructor() {
    this.callbacks = new Map(); //存储自定义事件
  }

  /**
   * 注册事件和处理函数
   * @param event  时间名
   * @param fn  回调函数
   */
  on(event, fn) {
    // 存在直接push, 不存在创建为空数组再push
    if (!this.callbacks.get(event)) this.callbacks.set(event, new Set());

    this.callbacks.get(event).add(fn);
  }

  /**
   * 注册事件和处理函数，触发一次后销毁
   * @param event
   * @param fn
   */
  once(event, fn) {
    fn.flag = true;
    this.on(event, fn);
  }

  /**
   * 销毁事件和处理函数
   * @param event
   * @param fn
   */
  off(event, fn) {
    //不传参数表示清空所有
    if (!arguments.length) {
      this.callbacks.clear();
    }
    if (fn) {
      if (this.callbacks.has(event) && this.callbacks.get(event).has(fn)) {
        this.callbacks.get(event).delete(fn);
      }
    } else {
      this.callbacks.delete(event);
    }
  }

  /**
   * 触发某事件所有回调并带参数
   * @param event
   */
  emit(event, param) {
    const self = this;
    if (this.callbacks.has(event)) {
      this.callbacks.get(event).forEach((fn) => {
        if (fn.flag) {
          this.off(event, fn);
        }
        fn(param);
      });
    } else {
      console.log(`${event}事件没有回调！`);
    }
  }
}
//测试用例
let e = new EventBus();
e.on("say", (name) => {
  console.log(name);
});

e.once("say", (name) => {
  console.log(name + "asd");
});

e.once("run", () => {
  console.log("i m is run");
});
e.on("hello", () => {
  console.log("hello");
});
e.emit("say", "xiaom");
e.off("hello");
e.emit("hello");
e.emit("say", "xiaoh");
e.emit("run");
e.emit("run");

// this问题
