// Задача №1. Функция должна найти и вернуть максимальный элемент в массиве.

// Вариант №1. Циклы
function max(arr) {
    var max = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// Вариант №2. Рекурсия
function max(arr) {
    return arr.reduce((a, b) => a > b ? a : b);
}

console.log(max([8]), 'one element test, must return 8');
console.log(max([1, 8, 37, 5, 17]), '5 elements test, must return 37');
console.log(max([8, 17]), '2 elements test, must return 17');