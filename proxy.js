/* 
Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，
可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
 */

 // 用法如下,target是目标对象,handler参数也是一个对象，用来定制拦截行为。
 // 返回的是代理对象,后面所有的操作都是操作代理对象而不是目标对象

 // var proxy = new Proxy(target, handler);


 // 拦截get行为  读取器的两个参数分别是目标对象和要访问的属性

 const obj = {
     name:'xiaom'
 }

 const objProxy = new Proxy(obj,{
     get(target,key){
       
        return 'xiaoh'
     }
 })

 console.log(objProxy.name)

 // proxy对象可以作为其他对象的原型对象，当访问某对象上没有的属性时，会访问到代理对象上，从而被拦截

 //let obj1 = Object.create(proxy); // obj1的原型是proxy
 

 // proxy 支持的拦截操作一共13种

 // 1. get方法 用于拦截某个属性的读取操作
 // 2. set方法用来拦截某个属性的赋值操作
 // 3. apply方法拦截函数的调用、call和apply操作。