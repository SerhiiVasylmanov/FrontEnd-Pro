'use strict';

/**
 * Калькулятор на ООП
 *
 * Создать функцию конструктор которая
 * принимает базовое знаячение и возвращает
 * объект с набором методов которые могут
 * прибавлять, вычитать, устанавливать новое
 * базовое знаячение и возвращать значение.
 *
 * Если вместо числа передается что-то другое, например строка
 * - возвращать NaN и ничего не делать
 */

function createCalculator(base) {
    this.base = base;

    this.isNumber = function(secondValue) {
        return Number.isInteger(secondValue);
    }
    this.add = function(secondValue) {
        if (this.isNumber(secondValue)) {
            return this.base += secondValue;
        }
        return NaN
    }
    this.sub = function(secondValue) {
        if (this.isNumber(secondValue)) {
            return this.base -= secondValue;
        }
        return NaN
    }
    this.set = function(secondValue) {
        if (this.isNumber(secondValue)) {
            return this.base = secondValue;
        }
        return NaN
    }
    this.get = function() {
        return this.base;
    }
};

const calc = new createCalculator(100);