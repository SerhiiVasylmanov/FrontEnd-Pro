const input = document.querySelector('#input');
const btnAdd = document.querySelector('#addBtn');
const list = document.querySelector('#list');
const message = input.placeholder;
const errorMessage = 'You have not entered any text';

btnAdd.addEventListener('click', activateInput);

function activateInput() {
    if (!input.value) {
        inputError();
        return
    }
    addLi();
    inputReset();
    removeItem(listItem);
    readyItem(listItem);
};

function inputError() {
    input.classList.add('input_error');
    input.placeholder = errorMessage;
};

function inputReset() {
    input.value = '';
    input.placeholder = message;
    input.classList.remove('input_error');
};

function addLi() {
    listItem = document.createElement('li');
    listItem.className = 'list_item';
    listItem.innerHTML = `<span class="paragraph">${input.value}</span>` +
        `<button class="deleteBtn">Удалить</button>` +
        `<button class="readyBtn">Готово</button>`;
    list.append(listItem);
};

function removeItem(item) {
    let removeBtn = item.querySelector('.deleteBtn');

    removeBtn.onclick = () => removeBtn.parentElement.remove();
};

function readyItem(item) {
    let readyBtn = item.querySelector('.readyBtn');
    let paragraph = item.querySelector('.paragraph');

    readyBtn.onclick = () => paragraph.classList.toggle('green');
};