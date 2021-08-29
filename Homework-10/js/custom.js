// Задача №1. Функция должна найти и вернуть максимальный элемент в массиве.

//Вариант №1. Циклы
function max(arr) {
    var max = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

console.log(max([8]), 'one element test, must return 8');
console.log(max([1, 8, 37, 5, 17]), '5 elements test, must return 37');
console.log(max([8, 17]), '2 elements test, must return 17');

// Вариант №2. Рекурсия

function max2(arr) {

    if (arr.length == 1) {
        return arr[0];
    }

    var number = arr.slice();

    if (number[0] < number[1]) {
        number.splice(0, 1);
    } else {
        number.splice(1, 1);
    }
    return max2(number);
}

console.log(max2([5]), 'one element test, must return 5');
console.log(max2([3, 10, 47, 5, 27]), '5 elements test, must return 47');
console.log(max2([5, 22]), '2 elements test, must return 22');


function max3(arr) {
    var max = -Infinity;

    for (var i = 0; i < arr.length; i++) {
        var number = arr[i];

        if (Array.isArray(number)) {
            number = findMax(number);
        }

        if (number > max) {
            max = number;
        }
    }

    return max;
}

console.log(max3([4]), 'one element test, must return 4');
console.log(max3([4, 11, 48, 6, 28]), '5 elements test, must return 48');
console.log(max3([6, 23]), '2 elements test, must return 23');