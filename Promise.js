// js异步编程的解决方案
// 关于js的异步编程，传统解决方案主要有回调函数，事件监听，发布订阅模式，promise等 本文将对前三种做简单介绍，详细介绍promise
/* 1.回调函数
  作为异步编程的经典解决方案，js中回调函数无处不在。下面是一个经典例子
  ajax(url, () => {
    // 处理逻辑
  })
  ajax请求得到结果后再执行回调函数中的代码，由此可以看出回调函数简洁直观。但当多个异步任务具有依赖性时，必须进行回调函数嵌套
  这将导致代码结构混乱，难以维护，这也被称为回调地狱。
  2.事件监听
  采用事件驱动模式，在这种模式下，异步任务的执行不取决于代码的顺序，而取决于某个事件是否发生。
  看一个例子
  f1.on('done', f2);
  这个例子中，当f1 出发done事件时，f2立即执行。而done事件是在f1中定义的，f1执行完毕后会立即触发done
  事件监听的方式也很直观，且可以绑定多个事件，但缺点是整个程序都要变成事件驱动型，运行流程会变得不清晰。
  3.发布订阅模式
  该模式可以用一个很形象的例子说明。发布订阅模式有三个核心模块，发布者，订阅者，处理中心。这三者的关系就相当于杂志主编，报刊大厅，报刊读者的关系。
  读者在报刊大厅订阅了一份杂志，而当该杂志的主编发布一期报刊时，大厅就会通知用户来拿新的报刊。
  显然，比起事件监听，发布订阅模式的优点在于可通过处理中心了解存在多少信号以及每个信号有多少订阅者等信息
  4.Promise
  es6开始提供了Promise对象，它是一种更合理更强大的异步编程解决方案

    通俗的讲，promise对象可以理解为一个容器，容器里面存放着一个特殊的事件，该事件的执行需要一定的时间后才能有结果（一般是异步事件）。而
  promise可以获取该结果，并根据这个结果改变自身状态，同时对不同的异步操作对外提供统一的api。而之所以叫promise（承诺）
  这个名字，是因为promise对象的状态只决定于异步操作的结果而与外界无关，一旦异步操作有了结果，promise的状态也即确定了。
  任何其他操作都无法改变这个状态。这即是promise名字的由来。下面做详细介绍

  promise的状态
  Promise对象有三种状态，他们分别是：
  1 pending：等待中，表示异步操作正在进行，还没有结果
  2 fulfilled 或 resolved：表示已成功，并得到了所期望的结果
  3 rejected：得到结果，但不是所期望的结果

  Promise 的状态一旦改变，就永久保持该状态，不会再变了。且只有两种可能，即pending变为fulfilled和从pending变为rejected


  promise的基本用法
  Promise构造函数接受一个函数作为参数，而该函数的两个参数分别是resolve和reject。且它们又是两个函数，作用是修改promise对象的状态。

  resolve函数的作用是，将Promise对象的状态从 pending 变为 resolved，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
  reject函数的作用是，将Promise对象的状态即从 pending 变为 rejected，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

  Promise实例具有then方法，它的作用是为promise对象状态改变时指定回调函数，换句话说，当promise对象状态改变时，会分别对应执行
  then方法中对应的回调函数。then方法有2个参数，第一个函数接收resolved状态的执行，第二个参数接收reject状态的执行。
  下面是一个简单例子
 */

function fn(i){
    return new Promise((resolve, reject) => {

        if(i === 5)
        {
            resolve(i) //当调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数
                       // reject函数的参数通常是Error对象的实例，表示抛出的错误
        }
        else(
            reject(i)
        )
    }).then((value) =>{
        console.log(value +' i等于5') 
    }, (value) => {
        console.log(value +' i不等于5')
    })
}
fn(1); // i不等于5
fn(5); // i等于5
/* 需要注意的是，promise对象的then方法返回的是一个新的promise实例。之所以说是新的promise实例，是指它不是原来的那个promise实例。
前面讲到promise实例具有then方法。因此可以进行then方法的
链式编程，即then方法后再接一个then方法。而then的链式编程又分两种情况。
1 前一个then的回调函数返回的是普通对象，则该对象会作为参数传入下一个then的回调函数。看下面例子*/
 function fn(i){
    return new Promise((resolve, reject) => {

        if(i === 5)
        {
            resolve(i)
                       
        }
        else(
            reject(i)
        )
    })
}
fn(5).then((value) =>{
    return value+1
}).then((value) => {
    console.log(value)
});// 打印6 

/* 
第二种情况 前一个then的回调函数返回的是promise对象（包含异步操作），此时后一个then中的回调函数就会等待该promise的状态发生变化时
再执行。由此即可以用then的链式编程指定一组按顺序调用的异步操作，解决回调地狱的问题。看下面例子 */

function fn(i){
    return new Promise((resolve, reject) => {
        if(i === 5)
        {

            resolve(i+1)
                       
        }
        else(
            reject(i)
        )
    })
}

fn(5).then(value => fn(value)) //第一个then方法返回了一个promise对象
.then(
    value => console.log(value),
    err => console.log(err,'i不等于5')
) // 打印 6 i不等于5



// 区分 then方法返回一个promise实例  和 then方法的回调函返回值是primise对象


/* promise.catch  该方法用于指定发生错误时的回调函数
上面讲到，promise有三种状态。当状态变为resolved时，会调用then()方法指定的回调函数；而当异步操作抛出错误时，promise状态将会变为rejected，
此时则会调用catch指定的回调函数。这里要说明一点，前面讲到promsie的then方法的第二个参数也可以指定rejected状态的回调函数，但一般地，我们通常
使用catch方法来捕获错误，理由是catch方法不仅会捕获异步操作的错误，还会捕获then方法指定的回调函数运行过程中抛出的错误。还要注意的时当promise的
状态已经变为rejected，再抛出错误是无法被catch方法捕获到的，因为前面讲到promise的状态一旦改变则将永久保持该状态
下面看一个例子
*/

function fn(i){
    return new Promise((resolve, reject) => {
       resolve()
    })
}
fn(1).then( ()=> {
    throw new Error('error') // then方法抛出错误，会被catch捕获到
})
.catch( err => console.log(err))


/* 
promise.finally  该方法无论promise最后的状态如何，都会指定finally指定的回调函数。该方法不接受任何参数，这就意味着该方法的执行与promise的状态无关
下面是一个例子，服务器使用 Promise 处理请求，然后使用finally方法关掉服务器。
*/ 
server.listen(port)
  .then(function () {
    // ...
  })
  .finally(server.stop);

/* promise.all  promise.race 
这两个方法都接受一个由promise实例组成的数组作为参数，且会将这些Promise实例包装成一个新的Promise实例，不同的是
1 all方法 只有作为参数的几个promise实例状态都变为fulfilled时，它才会变为fulfilled，并将他们的返回值组成一个数组传递给自己的回调函数
看一个例子
 */

function fn(i){
    return new Promise((resolve, reject) => {
        if(i === 5)
        {

            resolve(i+1)
                       
        }
        else(
            reject(i)
        )
    })
}
const list = [fn(5), fn(5), fn(5)]
Promise.all(list).then( value => {
    console.log(value) // 打印[ 6, 6, 6 ]
})
/* 
all方法 当作为参数的几个promise实例状态有一个变为rejected，则其状态立即变为rejected，且第一个状态变为rejected的promise的返回值会
传递给自身的回调函数，看下面例子
 */
const list = [fn(5), fn(7), fn(5)]
Promise.all(list).then( value => {
    console.log(value) 
}).catch(err => {
    console.log(err) // 打印7
})



/* 
2 race方法 只要作为参数的几个promise的状态有一个率先改变状态，则其状态也立即变为相应状态并传递参数，看下面例子
 */
const list1 = [fn(5), fn(5), fn(5)]
const list2 = [fn(7), fn(5), fn(5)]
Promise.race(list1).then( value => {
    console.log(value) // 打印6
})
Promise.race(list2).then( value => {
    console.log(value) // 打印6
}).catch(err => {
    console.log(err) // 打印7
})

// 以上是promise对象的基础，后面会继续分享一些promise的经典应用
