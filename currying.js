 // 柯里化定义 为什么用柯里化 闭包

    /*
    定义 把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，
    并且返回接受余下的参数而且返回结果的新函数的技术。 

    用处 1 参数复用

    // 正常正则验证字符串 reg.test(txt)

    // 函数封装后
    function check(reg, txt) {
        return reg.test(txt)
    }

    check(/\d+/g, 'test')       //false
    check(/[a-z]+/g, 'test')    //true

    // Currying后
    function curryingCheck(reg) {
        return function(txt) {
            return reg.test(txt)
        }
    }

    var hasNumber = curryingCheck(/\d+/g)
    var hasLetter = curryingCheck(/[a-z]+/g)

    hasNumber('test1')      // true
    hasNumber('testtest')   // false
    hasLetter('21212')      // false
    上面的示例是一个正则的校验，正常来说直接调用check函数就可以了，但是如果我有很多地方都要校验是否有数字，
    其实就是需要将第一个参数reg进行复用，
    这样别的地方就能够直接调用hasNumber，hasLetter等函数，让参数能够复用，调用起来也更方便。
        */
       

    /* 2 减少循环 提升性能
       vue中如何判断一个标签是html标签还是自定义组件 可以进行枚举 把所有的html标签存起来
       每次都判断一下是不是包含在该数组里，但这样非常浪费性能。因为每次都要做同样的循环。
       那么这样重复的循环能不能只做一次呢？   */

    let tags = 'div,p,a,img,ul,li'.split(',');
    
      function makeMap( keys ) {
      let set = {}; // 集合
      keys.forEach( key => set[ key ] = true );

      return function ( tagName ) {
        return !!set[ tagName.toLowerCase() ] // ！！ 将变量转为布尔值
      }
    }

    let isHTMLTag = makeMap( tags ); // 返回的函数

    console.log(isHTMLTag('div'))
    console.log(isHTMLTag('menu'))

    // 10 个标签需要判断, 那么还有没有循环存在??? 有 但只需要一次循环
    // 立即推 遇到这样的需要多次判断某个数据集合里有没有某个值就可以参考这种做法

      
       
 

    // 闭包应用之函数柯里化 
    // 闭包应用之实现私有变量

