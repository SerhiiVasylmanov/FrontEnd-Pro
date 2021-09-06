const input = document.querySelector('#input');
const btn = document.querySelector('#btn');
const list = document.querySelector('#list');
const message = input.placeholder;
const errorMessage = 'You have not entered any text';

let listItem;

function activInput() {
    if (!input.value) {
        input.classList.add('input_error');
        input.placeholder = errorMessage;
        return;
    } else {
        listItem = document.createElement('li');
        listItem.className = 'list_item';
        listItem.innerText = `${input.value}`;
        list.append(listItem);
        input.placeholder = message;
        input.value = '';

        if (input.classList.contains('input_error')) {
            input.classList.remove('input_error');
        }

    }
}

btn.addEventListener('click', activInput);