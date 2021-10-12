//// Задача №1 Дан массив ['a', 'b', 'c']. Добавьте ему в конец элементы 1, 2, 3.

var array1 = ['a', 'b', 'c'];
array1.push(1, 2, 3);
console.log(array1);



//// Задача №2 Дан массив [1, 2, 3]. Сделайте из него массив [3, 2, 1].

//Вариант №1
var array2 = [1, 2, 3];
var deleted = array2.splice(0, 3, 3, 2, 1);
console.log(array2);

//Вариант №2
var array2 = [1, 2, 3];
console.log(array2.reverse());



//// Задача №3 Дан массив [1, 2, 3]. Добавьте ему в начало элементы 4, 5, 6.

var array3 = [1, 2, 3];
array3.unshift(4, 5, 6);
console.log(array3);



//// Задача №4 Дан массив [1, 2, 3, 4, 5]. С помощью метода slice запишите в новый элементы [1, 2, 3].

var array4 = [1, 2, 3, 4, 5];
var array5 = array4.slice(0, 3);
console.log(array5);



//// Задача №5 Дан массив ['js', 'css', 'jq']. Выведите на экран первый элемент.

var array6 = ['js', 'css', 'jq'];
document.write(array6[0]);



//// Задача №6 Напишите функцию, которая возвращает объект, составленный из значений вложенных массивов. Первое значение - ключ, второе - зачение.

var fromPairs = (array7) => {
    const result = Object.fromEntries(array7);
    return result;
}
const data = [['a', 1], ['b', 2]];
console.log(fromPairs(data));