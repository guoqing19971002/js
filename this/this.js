const foo = {
    a:1,
    get:() => {
        console.log(this.a)
    },
    bar:function () {
        console.log(this.a)
    }
}
foo.get() // 箭头函的this是上级作用域的this 上级是foo 是个对象 无法形成独立作用域
foo.bar()