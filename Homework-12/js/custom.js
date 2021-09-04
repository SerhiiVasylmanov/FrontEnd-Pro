/* Создать функцию калькулятор которая умеет
    прибавлять, вычитать, устанавливать новое 
    базовое знаячение и возвращать значение.
Если вместо числа передается что - то другое, например строка 
    - возвращать NaN и ничего не делать */


function createCalculator(data) {

    let numb = data;

    return {
        add: (toAdd) => (typeof toAdd === 'number') ? numb += toAdd : NaN,
        sub: (toSub) => (typeof toSub === 'number') ? numb -= toSub : NaN,
        set: (newNumb) => (typeof newNumb === 'number') ? numb = newNumb : NaN,
        get: () => console.log(numb),
    }
};

const calculator = createCalculator(100);

console.log(calculator.add(10)); // 110
console.log(calculator.add(10)); // 120
console.log(calculator.sub(20)); // 100
console.log(calculator.set(20)); // 20
console.log(calculator.add(10)); // 30
console.log(calculator.add(10)); // 40
console.log(calculator.add('qwe')); // NaN и значение 40 не менять\
calculator.get(); // 40
console.log(calculator.add(10)); // 50
console.log(calculator.add(10)); // 60
console.log(calculator.sub(20)); // 40