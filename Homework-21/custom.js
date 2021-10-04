//Задача №1: вывести сначала 10, потом 15 описав после функции вызов с контекстом

var x = 10;
var obj = { x: 15 };

function fun() {
    alert(this.x);
    alert(this);
}

fun();
fun.call(obj);

//Задача №2: использовать метод, принадлежащий одному объекту, а вызвать его в контексте другого:
//вернуть "Max White" вызвав fullaName

var person = {
    firstName: "John",
    lastName: "Konor",
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
}

var user = {
    firstName: "Max",
    lastName: "White",
}

console.log(person.fullName.call(user));

//Задача №3: через метод apply вызвать функцию и вернуть["0", "1", "2", "length", "callee"]

var tester = function () {
    alert(arguments);
    let args = Array.from(arguments);
    console.log(args);
};

const tester2 = ["0", "1", "2", "length", "callee"];

tester.apply(null, tester2);

