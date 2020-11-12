function Test (name){
    this.name = name
    this.say = function(){
        console.log(this.name)
    }
}
const p1 = new Test('小明')
p1.say()