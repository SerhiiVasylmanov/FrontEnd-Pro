// Задача 'Группа студентов':

class Group {
    #students;

    constructor() {
        this.#students = [];
    }

    addStudent(student) {
        if (this.#isStudent(student)) {
            this.#students.push(student);
        }
    }

    get students() {
        return this.#students;
    }

    #isStudent(student) {
        return student instanceof Student;
    }

    getAverageMark() {
        return (
            this.#students.reduce(function (sum, current) {
                return sum + current.getAverageMark();
            }, 0) / this.#students.length
        );
    }
}

class Student {
    constructor(name, mark) {
        this.name = name;
        this.mark = mark;
    }

    getAverageMark() {
        return (
            this.mark.reduce(function (sum, current) {
                return sum + current;
            }) / this.mark.length
        );
    }
}

const group = new Group();

group.addStudent(new Student("John", [10, 8]));
group.addStudent(new Student("Alex", [9, 7]));
group.addStudent(new Student("Bob", [5, 8]));

// При добавлении валидировать тип добавляемого объекта
// и если тип не Student - игнорировать
// функцию валидатор сделать приватной
console.log(group.students.length === 3);
group.addStudent({});
console.log(group.students.length === 3);

// Выводим средний балл группы
console.log(group.getAverageMark() === (10 + 8 + 9 + 7 + 5 + 8) / 6);
//7.83

// Сделать group.students - readonly
group.students = [new Student("John", [9, 9, 7, 5])];
console.log(group.students.length === 3);

// Написать полифил для массива:

const getMax = function () {
    let max = this[0];

    if (this.length === 0) {
        max = -1;
    } else {
        for (let i = 1; i <= this.length; i++) {
            if (max < this[i]) max = this[i];
        }
    }
    return max;
};

Array.prototype.max = getMax;

[6, 5, 8, 7].max();
