const SELECTOR = Object.freeze({
    TABLE: '#table-post',
    LIST: '#list-post',
    INPUT_ITEM: '#input-post-info',
    INPUT_TITLE: '#input-post-title',
    INPUT_BODY: '#input-post-body',
    ADD_BTN: '#add-post-btn',
    TODO_ITEM: '.post-item',
    TODO_ITEM_TEMPLATE: '#post-template',
    LOADING: '#loading',
    ERROR: '#error',
});

const CLASS = Object.freeze({
    POST_ITEM: 'post-item',
    POST_ID: 'post-id',
    POST_TITLE: 'post-title',
    POST_BODY: 'post-body',
    REMOVE_BTN: 'button-delete-post',
    HIDE: 'hide',
});

const table = document.querySelector(SELECTOR.TABLE);
const list = document.querySelector(SELECTOR.LIST);
const item = document.querySelector(SELECTOR.TODO_ITEM);
const inputItem = document.querySelector(SELECTOR.INPUT_ITEM);
const inputTitle = document.querySelector(SELECTOR.INPUT_TITLE);
const inputBody = document.querySelector(SELECTOR.INPUT_BODY);
const button = document.querySelector(SELECTOR.ADD_BTN);
const todoHTML = document.querySelector(SELECTOR.TODO_ITEM_TEMPLATE).innerHTML;
const loading = document.querySelector(SELECTOR.LOADING);
const error = document.querySelector(SELECTOR.ERROR);

button.addEventListener('click', onAddTodoButtonClick);
list.addEventListener('click', onTodoListClick);

init();

function init() {
    toggleLoading();

    TodoAPI.getList()
        .then(addTodoList)
        .catch(handleError)
        .finally(() => toggleLoading());
}

function onAddTodoButtonClick() {
    const todo = getTodo();

    if (!isTodoValid(todo)) {
        alert('Вы не ввели данные');
        return;
    }

    addTodo(todo);
    clear();
}

function onTodoListClick(e) {
    const todoEl = getTodoElement(e.target);

    if (e.target.classList.contains(CLASS.REMOVE_BTN)) {
        return removeTodo(todoEl);
    }
}

function getTodoElement(target) {
    return target.closest(SELECTOR.TODO_ITEM);
}

function getTodo() {
    return {
        title: inputTitle.value,
        body: inputBody.value,
    };
}

function isTodoValid(todo) {
    return todo && todo.title && todo.body && todo.title.length >= 3 && todo.body.length >= 3;
}

function addTodoList(todoList) {
    const html = todoList
        .map(todo => getTodoHTML(todo)).join('');

    list.innerHTML = html;
}

function addTodo(todo) {
    toggleLoading();

    TodoAPI.create(todo)
        .then((data) => data.id)
        .then(() => TodoAPI.getList())
        .then(addTodoList)
        .catch(handleError)
        .finally(toggleLoading)
}

function getTodoHTML(todo) {
    return todoHTML
        .replace('{{todoId}}', todo.id)
        .replace('{{todoId}}', todo.id)
        .replace('{{todoTitle}}', todo.title)
        .replace('{{todoBody}}', todo.body);
}

function removeTodo(el) {
    el.remove();

    TodoAPI
        .delete(+el.dataset.id)
        .catch(handleError)
}

function clear() {
    inputTitle.value = '';
    inputBody.value = '';
}

function toggleLoading() {
    loading.classList.toggle(CLASS.HIDE);
}

function handleError(e) {
    error.textContent = e.message;

    setTimeout(() => error.textContent = '', 5000);
}

