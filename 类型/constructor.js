function Person (){
    this.name = '小明'
}
const person = new Person()

/* console.log(Person.prototype)
console.log(Person)
console.log(person) */

console.log(person.constructor === Person) // true