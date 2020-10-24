let person = function(name,age){
    this.name = name
    this.age = age
    this.say = function(){
        console.log('my name is ' + this.name)
    }
}
 const p1 = new person('张三',18)
 p1.say()
 console.log(person.prototype)