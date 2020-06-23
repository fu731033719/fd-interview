// var person = (function () {
//     var age = 25
//     return {
//         name: 'Lee',
//         getAge: function () {
//             return age
//         },
//         setAge: function () {
//             age++
//         }
//     }
// }());
// console.log(person.name) // Lee
// console.log(person.getAge()) // 25
// person.age = 100 // hack try...
// console.log(person.getAge()) // 25

function Person(name) {
    this.name = name
    let age = 18
    this.getAge = function () {
        return age
    }
    this.setAge = function () {
        age++
    }
}
var person = new Person('Lee')
console.log(person.name) // Lee
console.log(person.getAge()) // 18
person.age = 100 // hack try...
Person.age = 100 // hack try...
console.log(person.getAge()) // 18