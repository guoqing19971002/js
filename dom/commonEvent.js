/*
通用的事件侦听器 
 */
// 把所有方法封装到一个对象里面，充分考虑兼容写法
var EventUtil = {
    // 添加DOM事件
    addEvent: function(element, type, handler) {
      if(element.addEventListener) { //DOM2级
        element.addEventListener(type, handler, false);
      }else if(element.attachEvent) {  //IE
        element.attachEvent("on"+ type, handler);
      }else {
        element["on" + type] = handler;
      }
    },
    // 移除DOM事件
    removeEvent: function(element, type, handler) {
      if(element.removeEventListener) { //DOM2级
        element.removeEventListener(type, handler, false);
      }else if(element.detachEvent) {  //IE
        element.detachEvent("on"+ type, handler);
      }else {
        element["on" + type] = null;
      }
    },
    // 阻止事件冒泡
    stopPropagation: function(ev) {
      if(ev.stopPropagation) {
        ev.stopPropagation();
      }else {
        ev.cancelBubble = true;
      }
    },
    // 阻止默认事件
    preventDefault: function(ev) {
      if(ev.preventDefault) {
        ev.preventDefaule();
      }else {
        ev.returnValue = false;
      }
    },
    // 获取事件源对象
    getTarget: function(ev) {
      return ev.target || ev.srcElement;
    },
    // 获取事件对象
    getEvent: function(e) {
      var ev = e || window.event;
      if(!ev) {
        var c = this.getEvent.caller;
        while(c) {
          ev = c.arguments[0];
          if(ev && Event == ev.constructor) {
            break;
          }
          c = c.caller;
        }
      }
      return ev;
    }
  };