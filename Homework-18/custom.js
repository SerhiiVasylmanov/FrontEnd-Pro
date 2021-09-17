'use strict';

function Hamburger(obj) {
    this.money = obj.money;
    this.calorie = obj.calorie;
};

Hamburger.SIZE_SMALL = {
    money: 50,
    calorie: 20,
};

Hamburger.SIZE_MIDDLE = {
    money: 75,
    calorie: 30,
};

Hamburger.SIZE_BIG = {
    money: 100,
    calorie: 40,
};

Hamburger.TOPPING_CHEESE = {
    money: 10,
    calorie: 20,
};

Hamburger.TOPPING_SALAD = {
    money: 20,
    calorie: 5,
};

Hamburger.TOPPING_POTATO = {
    money: 15,
    calorie: 10,
};

Hamburger.TOPPING_SPICES = {
    money: 15,
    calorie: 0,
};

Hamburger.TOPPING_MAYO = {
    money: 20,
    calorie: 5,
};

Hamburger.prototype.addTopping = function (obj) {
    this.money += obj.money;
    this.calorie += obj.calorie;
};

Hamburger.prototype.getPrice = function () {
    return this.money;
};

Hamburger.prototype.getCalories = function () {
    return this.calorie;
};

const hamburger = new Hamburger(Hamburger.SIZE_BIG);

hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_POTATO);
hamburger.addTopping(Hamburger.TOPPING_CHEESE);
hamburger.addTopping(Hamburger.TOPPING_SALAD);

console.log("Price with sauce: " + hamburger.getPrice() + " $");
console.log("Calories with sauce: " + hamburger.getCalories() + " cal");