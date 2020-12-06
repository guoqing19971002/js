/* function foo(){
    function bar (){
        console.log(name)
    }
    bar()

    var name = '小明'
    
}
foo() */
/* foo执行上下文
foo.EC = {
    VO:{ //变量对象
        this:window,
        arguments:[],函数参数
        bar: function 
        name: undefined //var声明的变量 将被提升并赋值为undefined
    },
    [[scope chain]]:{}  // 作用域链 下一章节做详细说明
} 
 */

/*  var name = '小明'
 function foo(){
   
   console.log(name) // undefined var定义的变量，没有块的概念，因此name提升并被赋值为undefined
   
   if (true)
   {
     var name = '小红'
   }
   
 }
 foo() // */

/*  var name = '小明'
 function foo(){
   
   console.log(name) // 小明
   
   if (true)
   {
     const name = '小红'
   }
   
 }
 foo() // */


/* for (var i = 0; i < 5; i++) {
    console.log(i)
}
console.log(i) // 5 当i=5时循环结束，此时外部可以访问到i

 
for (let i = 0; i < 5; i++) {
    console.log(i)
}
console.log(i) // i is not defined 块级变量外部无法访问 */

/* var a = 1

function foo() {
    var b = 2
    console.log(a)

    function bar() {
        var c = 3
        console.log(b)
    }
    bar()
}
foo() */
/* 
 js默认进入全局执行环境 
 foo的定义阶段

 foo.[[scope]] = { 该属性保存了与该函数相关的变量对象，显然
                   foo的上层环境是window，window变量对象没有arguments属性
    GO:{
        this:window,
        window:{...},
        a:undefined
    }
 }
 
 foo进入执行阶段  bar函数才会被定义
 此时由于foo函数已经执行，因此其变量对象已经被创建

 bar.[[scope]] = {
     AO(foo):{
         this:window, 函数被调用时确定this指向，显然foo为独立调用，非严格模式下this指向window
         arguments:[],
         b:2
     },
     GO:{
        this:window,
        window:{...},
        document:{...},
        a:1
    }
 }


*/


// 执行阶段


// foo函数调用时

/* 

foo.EC = { //foo函数的执行上下文
    AO:{
        this:window,
        arguments:[],
        b:2,
        bar:function
    },
    [[scope chain]]:{ foo的作用域链
        AO:AO, // 推入作用域链顶部的活动对象
        GO:{....} // [[scope]]中的全局对象
    } 
}

bar.EC = {
    AO:{
        this:window,
        arguments:[],
        c:3
    },
    [[scope chain]]:{
        AO(bar):AO,
        AO(foo):{
         this:window,
         arguments:[],
         b:2
        },
        GO:{
            this:window,
            window:{...},
            document:{...},
            a:1
        }
    }
}
*/

var a = 20;

function foo() {
  if (!a) {
    a = 100;
  }

  var a = 10;

  return a;
}

console.log(foo());