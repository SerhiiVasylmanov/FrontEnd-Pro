//Перепишите цикл через map
//Код ниже получает из массива строк новый массив, содержащий их длины:
var arr = ["Есть", "жизнь", "на", "Марсе"];
var arrLength = [];
for (var i = 0; i < arr.length; i++) {
    arrLength[i] = arr[i].length;
}

document.write(`<h2> Решение через "циклы" ==> ${arrLength} </h2>`); // 4,5,2,5

//Map
const newArrLength = arr.map((item) => item.length);

document.write(`<h2> Решение через "map" ==> ${newArrLength} </h2>`);


//Задача.Даны два массива: ['a', 'b', 'c'] и[1, 2, 3].Объедините их вместе.
let arr2 = ['a', 'b', 'c'];
let arr3 = [1, 2, 3];
let unionArr = arr2.concat(arr3);

document.write(`<h2> Объединение массивов ['a', 'b', 'c'] и [1, 2, 3] ==> ${unionArr} </h2>`);


//Задача. Дан массив ['a', 'b', 'c']. Добавьте ему в конец элементы 1, 2, 3.

let arr4 = ['a', 'b', 'c'];
arr4.push(1, 2, 3);

document.write(`<h2> Объединение массивов [a, b, c] и [1, 2, 3] 'push' ==> ${arr4} </h2>`);


//Работа с concat
//Даны два массива: [1, 2, 3] и [4, 5, 6]. Объедините их вместе.
let arr5 = [1, 2, 3];
let arr6 = [4, 5, 6];
let newUnionArr = arr5.concat(arr6);

document.write(`<h2> Объединение массивов [1, 2, 3] и [4, 5, 6] 'concat' ==> ${newUnionArr} </h2>`);


//Работа с reverse
//Дан массив[1, 2, 3].Сделайте из него массив[3, 2, 1].
arr5.reverse();

document.write(`<h2> из [1, 2, 3] в [3, 2, 1] 'reverse' ==> ${arr5} </h2>`);

//Работа с push, unshift
//Дан массив [1, 2, 3]. Добавьте ему в конец элементы 4, 5, 6.
let arr7 = [1, 2, 3];
arr7.push(4, 5, 6);

document.write(`<h2> Объединение массивов [1, 2, 3] и [4, 5, 6] 'push'==> ${arr7} </h2>`);

//Дан массив [1, 2, 3]. Добавьте ему в начало элементы 4, 5, 6.
let arr8 = [1, 2, 3];
arr8.unshift(4, 5, 6);

document.write(`<h2> Объединение массивов [1, 2, 3] и [4, 5, 6] 'unshift' ==>  ${arr7} </h2>`);


//Работа с shift, pop
//Дан массив ['js', 'css', 'jq']. Выведите на экран первый элемент.
let arr9 = ['js', 'css', 'jq'];
let deletedFirstElArr = arr9.shift();

document.write(`<h2>${deletedFirstElArr}<h2>`);

//Дан массив ['js', 'css', 'jq']. Выведите на экран последний элемент.
let deletedLastElArr = arr9.pop();

document.write(`<h2>${deletedLastElArr}<h2>`);


//Работа с slice
//Дан массив [1, 2, 3, 4, 5]. С помощью метода slice запишите в новый элементы [1, 2, 3].
//Дан массив [1, 2, 3, 4, 5]. С помощью метода slice запишите в новый элементы [4, 5].
let arr10 = [1, 2, 3, 4, 5];
let newArr = arr10.slice(0, 3);
let newArr2 = arr10.slice(-2);

document.write(`<h2> из [1, 2, 3, 4, 5] в [1, 2, 3] 'slice' ==> ${newArr} </h2>`);
document.write(`<h2> из [1, 2, 3, 4, 5] в [4, 5] 'slice' ==> ${newArr2} </h2>`);


//Работа с sort
//Дан массив [3, 4, 1, 2, 7]. Отсортируйте его.
let arr11 = [3, 4, 1, 2, 7];
arr11.sort((a, b) => a - b);

document.write(`<h2> Сортировка по возростанию с помощью 'sort'==> ${arr11} </h2>`);


//Работа с Object.keys
//Дан объект {js:'test', jq: 'hello', css: 'world'}. Получите массив его ключей.
let obj = { js: 'test', jq: 'hello', css: 'world' };

let keysObj = Object.keys(obj);
document.write(`<h2> Получение массива ключей объекта {js:'test', jq: 'hello', css: 'world'} ==> ${keysObj} </h2>`);


//Написать скрипт, который сделает полную копию исходного объекта с использованием рекурсии для вложенных объектов.
//Исходный и полученный результат вывести в консоль.
const info = {
    formatted_address: "Washington Square, New York, NY 10012, Сполучені Штати Америки",
    geometry: {
        location: {
            lat: 40.7308838,
            lng: -73.997332
        },
        viewport: {
            northeast: {
                lat: 40.7333674,
                lng: -73.99379435000002
            },
            southwest: {
                lat: 40.72847220000001,
                lng: -74.00132615
            }
        }
    },
    name: "Washington Square Park"
};

function getCopyObj(obj, clonObj = {}) {

    for (let key in obj) {

        if (typeof obj[key] === 'object') {
            clonObj[key] = getCopyObj(obj[key]);

        } else {
            clonObj[key] = obj[key];
        }
    }

    return clonObj;
};

const copyInfo = getCopyObj(info);

console.log(copyInfo);


//Бонус задача на reduce
const wizards = [
    {
        name: 'Harry Potter',
        house: 'Gryfindor'
    },
    {
        name: 'Cedric Diggory',
        house: 'Hufflepuff'
    },
    {
        name: 'Tonks',
        house: 'Hufflepuff'
    },
    {
        name: 'Ronald Weasley',
        house: 'Gryfindor'
    },
    {
        name: 'Hermione Granger',
        house: 'Gryfindor'
    }];
//создать новый массив, который будет содержать только имена мастеров из Hufflepuff. эту же задачу можно сделать и через map+filter, но в плане производительности сдесь лучше reduce

const newObj = wizards.reduce(function (acc, current) {
    if (current.house == 'Hufflepuff') acc.push(current.name);

    return acc;
}, []);

console.log(newObj);