/* 本文参考文章 https://www.jianshu.com/p/184988903562
众所周知js是单线程的，因此所有的任务都要排队执行。为了避免某些任务过于耗时而影响整体性能因此js任务
有同步和异步之分，那么问题来了，同步和异步任务的执行顺序是按照什么规则？
这就是js的事件循环和任务队列
当js代码开始执行，会首先区分同步和异步任务。同步任务按顺序依次执行，而异步任务则会被分发到任务队列中。
当主线程同步代码执行完毕，任务队列中的代码进入主线程中执行，这就是事件循环
任务队列中的任务执行顺序也有先后之分，任务队列中的代码都是异步任务，而异步任务又分为宏任务和微任务。执行顺序是先微后宏,有微则微，无微则宏。
常见的宏任务有主线程Script，setTimeout，setInterval，I/O等，常见的微任务有process.nextTick，promise.then()
Object.observe()等。要注意的是promise自身时同步的，而.then方法是异步的
如此js代码执行顺序为，先按顺序执行同步任务，同时将异步任务按照宏任务和微任务推入不同的任务队列。当script宏任务执行完毕时。
进入微任务队列依次执行，若微任务中又包含下属的宏任务或微任务，则继续推入相应的任务队列。执行完微任务队列再进入宏任务队列
依次执行，以此往复即js事件循环机制。下面看一个例子
 */
  setTimeout(() => { // 宏任务1，进入任务队列
    new Promise(resolve => { 
        console.log('promise1') //此时new promise里的代码，属于宏任务，而promise的then方法是微任务。
                            // promise本身是同步的，但then方法是异步的，会进入微任务队列 
        resolve('setTimeout1')
    }).then((res) =>{
            console.log(res)
    })
 
});
console.log('main') // 此处是主线程的同步任务，直接打印
new Promise(resolve => { 
        console.log('promise2') // 直接打印
        resolve()
    }).then(() =>{ // 微任务
        console.log('then')
        setTimeout(() =>{
         console.log('setTimeout')
        })
    })

console.log('over') // 直接打印

 /* 第一次执行结果 打印'main','promise2','over',微任务队列有微任务1，宏任务队列有宏任务1
 第二次执行微任务队列，打印'then'，定时器宏任务进入宏任务队列
 第三次执行宏任务队列，打印'promise1'，.then进入微任务队列，根据有微则微，无微则宏的原则，此时微任务队列有了新任务，
 因此优先执行,打印'setTimeout1'。之后微任务队列无新任务，继续执行宏任务队列，打印'setTimeout'
 至此任务队列所有任务执行完毕，代码执行结束。
 所有打印顺序为'main','promise2','over','then','promise1','setTimeout1',setTimeout' */


// 为进一步体现有微则微，无微则宏的概念，看以下例子
setTimeout(() => { 
    new Promise(resolve => { 
        console.log('3') 
        resolve()
    }).then((res) =>{
            console.log('4') // 代码执行到这里，微任务只有一个，打印4，继续执行，.then微任务入队列，则继续执行，打印5.之后微任务队列无新任务
            //再继续执行宏任务队列
            new Promise(resolve => { 
                resolve()
                }).then((res) =>{
                        console.log('5')
                })
    })
 
})
setTimeout(() => { 
    new Promise(resolve => { 
        console.log('6') 
        resolve()
    }).then((res) =>{
            console.log('7')
    })
 
})
setTimeout(() => { 
    new Promise(resolve => { 
        console.log('8') 
        resolve()
    }).then((res) =>{
            console.log('9')
    })
 
})
new Promise(resolve => { 
        console.log('1') 
        resolve()
    }).then(() =>{ 
        console.log('2')
        setTimeout(() =>{
         console.log('10')
        })
    })
// 代码打印结果为1 2 3 4 5 6 7 8 9 10