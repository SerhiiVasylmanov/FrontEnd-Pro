var age = prompt('Сколько лет?');
var smoke = confirm('Куришь? Если нет, нажми Отмена');

if (age < 18) {
    switch (smoke) {
        case false:
            alert('Так держать!');
            break;
        default:
            alert('Маме расскажу!');
    }
} else {
    switch (smoke) {
        case false:
            alert('Молодец, и не надо!');
            break;
        default:
            alert('Ну и зря');
    }
};
