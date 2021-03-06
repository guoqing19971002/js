/* 1 vue3 watchEffect 是vue3的一个新增的api 其功能与watch类似 不同之处在于

1 无需直接指定要监听的数据, 回调函数中使用到哪些数据就监视哪些数据(必须是响应式数据)
2 默认初始时就会执行第一次, 收集所需要监听的数据
3 监视数据发生变化时回调

*/
/* watchEffect(() => {
  console.log("watchEffect");
  person.name = user.firstName + "-" + user.lastName;
}); */

/* 梳理出大致思路，首先将数据进行响应化处理，将数据的get和set进行拦截。触发get时进行依赖收集,即将当前依赖与其在
watchEffect中指定的回调函数进行关联,set时执行相应依赖在watchEffect中指定的回调函数。以上操作可以使用es6的proxy来实现。

而watchEffect要做的就是,执行该回调函数，由于该回调函数一定会访问到所需要的变量，因此会触发依赖收集。上面提到，
依赖收集是将当前依赖与其多对应的回调函数进行关联。那如何能访问到这个回调函数呢。因此我们需要一个全局变量，
来存储当前正在被收集的依赖的回调函数。当依赖收集之前，将其挂载到全局。收集结束，提出全局，让出位置来给下一个
被收集的依赖存储其回调函数。

下面介绍Proxy，只介绍用到的api，其余api可自行查文档。
/* 
Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，
可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
 */

// 用法如下,target是目标对象,handler参数也是一个对象，用来定制拦截行为。
// 返回的是代理对象,后面所有的操作都是操作代理对象而不是目标对象

// var proxy = new Proxy(target, handler);

// 拦截get行为  读取器的两个参数分别是目标对象和要访问的属性

/*  const obj = {
     name:'xiaom'
 }

 const objProxy = new Proxy(obj,{
     get(target,key){
       
        return 'xiaoh'
     }
 })

 console.log(objProxy.name) */

// proxy对象可以作为其他对象的原型对象，当访问某对象上没有的属性时，会访问到代理对象上，从而被拦截

//let obj1 = Object.create(proxy); // obj1的原型是proxy

// proxy 支持的拦截操作一共13种

// 1. get方法 用于拦截某个属性的读取操作
// 2. set方法用来拦截某个属性的赋值操作
// 3. apply方法拦截函数的调用、call和apply操作。
// 4. has()方法拦截判断对象是否具有某个属性。典型操作是in运算符。注意两点 1.has()方法不判断一个属性是对象自身的属性，还是继承的属性。2.对 for in 不生效
// 5. construct()拦截new命令 目标对象必须是函数
// 6. deleteProperty() 拦截delete操作.如果该方法抛出错误或者返回false，当前属性就无法被delete命令删除。
// 7. defineProperty()方法 拦截Object.defineProperty()
// 8. getOwnPropertyDescriptor()方法拦截Object.getOwnPropertyDescriptor()
// getPrototypeOf()方法主要用来拦截获取对象原型

/*Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。
这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为 
 */

/*
 首先用proxy实现数据响应化，搭一个整体结构。实现get，set的拦截。
 发布订阅模式（看篇幅决定是否展开）
  */

function isObj(obj) {
  return typeof obj === "object";
}

function observe(obj) {
  if (!isObj(obj)) {
    return obj;
  }
  return new Proxy(obj, {
    get(target, key, receiver) {
      //console.log(key + "被收集");
      const res = Reflect.get(target, key, receiver); // proxy中的每个方法都与reflect中的同名方法对应

      //  依赖收集 v2中这里是将dep和watcher相互关联
      track(target, key);

      // 深层响应化
      return isObj(obj) ? observe(res) : res;
    },
    set(target, key, val, receiver) {
      //console.log("set", key);

      const res = Reflect.set(target, key, val, receiver);
      // 派发更新
      trigger(target, key);
      return res;
    },
    deleteProperty(target, key) {
      console.log("delete", key);
      const res = Reflect.deleteProperty(target, key);
      trigger(target, key);
      return res;
    },
  });
}

/*
  接下来 实现关键的两步  依赖收集  监听执行
  首先 我们要明确 依赖与其对应的回调函数是如何关联起来的。首先想到的是采用键值对的方式存入字典中。
  键名是被收集的依赖。键值是所对应的回调函数。显然这样是有缺陷的，那就是当我们对多个对象进行响应式处理时，
  而这多个对象中可能存在同名属性，这将造成覆盖。因此我们应对每一个响应式对象单独创建一个字典。并将这个对象作为
  键名，所对应的字典作为键值。存入一个全局字典中。但我们知道字典是无法将对象作为键名的。因此我们要用到WeakMap
  结构。WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。同时还要注意，一个属性对应的回调函数可能不止一个。
  可能再多个watchEfect中都收集了该属性。因此每个属性对应的键值应当是一个Set结构。首先创建一个WeakMap
   */

/* 依赖收集与派发更新的数据结构 */
// 总体是一个weakMap 键名是目标兑现 键值是一个map结构
// 该map结构的键名是目标对象的每一个属性key,键值是set结构，存储了该属性变化时应该触发的所有回调
// 将回调放入栈中的作用等同于v2 中将watcher放入全局栈中 目的是为了依赖收集时可以在全局访问到当前渲染watcher（v3中的回调）

/* 存储依赖关系数据结构 由于需要用对象作为键名，因此使用WeakMap 结构。
  它的整体结构是，以需要响应化的对象作为键名，键值是一个map结构。
  该map结构以每个对象的属性名为键名，键值为set结构。存储了该属性变化时需要触发的所有回调
   */
// 全局cb

let cb = null;

const targetMap = new WeakMap();

// v2中为组件添加watcher时,watcher会进行首次渲染，触发get，进而触发依赖收集。
// 因此这里要将观察者的回调首先执行一次，且在执行时要将该回调添加到全局栈中，以便依赖收集时能在全局访问到该回调。

/* 接下来实现依赖收集。主要过程为响应式对象的某个属性所对应的集合添加一个回调函数 */

/**
 * @description 实现依赖收集，为属性和其对应的回调函数建立关联
 * @param {Object} target 目标对象
 * @param {any}  key  当前被收集的属性
 */
function track(target, key) {
  const effect = cb; // 获取当前依赖对应的回调
  if (effect) {
    // 建立target，key和effect之间映射关系
    let depMap = targetMap.get(target);
    // 初始化时不存在创建一个map
    if (!depMap) {
      // 全局的WeakMap没有当前目标对象的键名
      depMap = new Map(); // 很明白
      targetMap.set(target, depMap);
    }
    // 获取key对象的set
    let deps = depMap.get(key); // 这个deps相当于v2 dep对象中deps属性,是一个数组,存储了所有观察自己的watcher
    // 而这里的结构是set
    if (!deps) {
      // 很明白
      deps = new Set();
      depMap.set(key, deps);
    }
    deps.add(effect); // map的添加方法 给当前set加一个回调函
  }
}

/* 接下来实现监听执行。从全局WeakMap中取出当前变更属性所对应的所有回调函数，依次执行 */
function trigger(target, key) {
  // 根据target和key获取对应的set
  // 并循环执行他们
  const depMap = targetMap.get(target);
  if (!depMap) {
    return;
  }
  const deps = depMap.get(key);
  //console.log(deps);
  deps.forEach((dep) => dep());
}

/* 最后实现watchEffect,分为三部,全局挂载回调函数，执行回调函，踢出回调函*/

function watchEffect(fn) {
  cb = fn;
  fn(); // 触发依赖收集
  cb = null;
}

let firstName = observe({ value: "李" });
let lastName = observe({ value: "云龙" });
let fullName = "";
let obj = observe({
  wife: {
    name: "秀芹",
  },
});
watchEffect(() => {
  fullName = firstName.value + lastName.value;
  console.log(fullName);
});
watchEffect(() => {
  console.log(obj.wife.name);
});
firstName.value = "赵";
lastName.value = "刚";
obj.wife.name = "冯楠";

// 用法如下,target是目标对象,handler参数也是一个对象，用来定制拦截行为。
// var proxy = new Proxy(target, handler);
// 返回的是代理对象,后面所有的操作都是操作代理对象而不是目标对象
/* Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，
    就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为  */
/* const obj = {
  name: "xiaom",
};
const objProxy = new Proxy(obj, {
  get(target, key) {
    console.log("get", key);
    
    return Reflect.get(target, key);
  },
  set(target, key, val) {
    console.log("set", key, val);
    const res = Reflect.set(target, key, val);
    return res;
  },
});

console.log(objProxy.name);
objProxy.name = "xiaom";
console.log(objProxy.name); */
