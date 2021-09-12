const input = document.querySelector('#input');
const btnAdd = document.querySelector('#addBtn');
const list = document.querySelector('#list');
const message = input.placeholder;
const errorMessage = 'You have not entered any text';

btnAdd.addEventListener('click', onButtonAddClick);

list.addEventListener("click", onListСontrolbtn);

function onButtonAddClick() {
    if (!input.value) {
        inputError();
        return
    }
    addTodo();
    inputReset();
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

function addTodo() {
    listItem = document.createElement('li');
    listItem.className = 'list_item';
    listItem.innerHTML = `<span class="paragraph">${input.value}</span>
                         <button class="deleteBtn">Удалить</button>
                        <button class="readyBtn">Готово</button>`;
    list.append(listItem);
};

function onButtonRemoveItem(e) {
    if (!e.target.classList.contains("deleteBtn")) {
        return;
    }

    let removeBtn = e.target;
    removeBtn.closest(".list_item").remove();
}

function onListСontrolbtn(e) {
    if (e.target.classList.contains("readyBtn")) {
        e.target.closest(".list_item").classList.toggle('green');
    }

    if (e.target.classList.contains("deleteBtn")) {
        e.target.closest(".list_item").remove();
    }
}