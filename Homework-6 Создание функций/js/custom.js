// Задание 1 :


function rgb(red = 0, green = 0, blue = 0) {
    return `rgb(${red}, ${green}, ${blue})`;
}

console.log('with given arguments ===>', rgb(23, 100, 134));
console.log('no arguments given ====>', rgb());


// // Задание 2 :


//    Вариант 2.1 :



function words(n = 0) {
    var product = 'товар';
    var products = 'товара';
    var commodity = 'товаров';
    if (n === 1 || n === 21 || n === 31 || n === 41) {
        return n + ' ' + product;
    }
    else if (n >= 2 && n <= 4 || n >= 22 && n <= 24 || n >= 32 && n <= 34 || n >= 42 && n <= 44) {
        return n + ' ' + products;
    }
    else if (n === 0 || n >= 5 && n <= 20 || n >= 25 && n <= 30 || n >= 35 && n <= 40 || n >= 45 && n <= 50) {
        return n + ' ' + commodity;
    }
}

console.log(words(0));
console.log(words(1));
console.log(words(2));
console.log(words(3));
console.log(words(4));
console.log(words(5));
console.log(words(21));
console.log(words(22));
console.log(words(23));
console.log(words(24));
console.log(words(25));

//     Вариант 2.2 :


function words(number) {
    switch (number) {
        case 1:
        case 21:
        case 31:
        case 41:
            return number + ' товар';
        case 2:
        case 3:
        case 4:
        case 22:
        case 23:
        case 24:
        case 32:
        case 42:
            return number + ' товара';
        default:
            return number + ' товаров';
    };
};

console.log(words(0));
console.log(words(1));
console.log(words(2));
console.log(words(3));
console.log(words(4));
console.log(words(5));
console.log(words(21));
console.log(words(22));
console.log(words(23));
console.log(words(24));
console.log(words(25));