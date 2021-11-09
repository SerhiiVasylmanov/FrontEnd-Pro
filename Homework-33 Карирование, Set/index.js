// Задание №1

function unique(arr) {
    return Array.from(new Set(arr));
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert(unique(values));

// Задание №2

function volume(l, w, h) {
    return l * w * h;
}

const aCylinder = volume(100, 20, 90); // 180000

alert(aCylinder);

function volume2(l) {
    return (w) => {
        return (h) => {
            return l * w * h
        }
    }
}

const bCylinder = volume2(100)(20)(90)

alert(bCylinder);

