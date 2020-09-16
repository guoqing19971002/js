setTimeout(() => {
    new Promise(resolve => { 
        console.log('promise') //此处时new promise里的代码，属于宏任务，而promise的then方法是微任务。
                            // promise本身是同步的，但then方法是异步的，会进入事件队列 
        resolve()
    }).then(() =>{
            console.log('ccc')
    })

    console.log('bbb') // 此处是主线程的同步任务

    setTimeout(() => { // 异步任务，进入队列
        console.log('ddd')
    }, 10);
}, 100);

console.log('aaa')