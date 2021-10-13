const SELECTOR = Object.freeze({
    LIST: '.todo-list',
    INPUT: '.message-input',
    ADD_BTN: '.add-button',
    TODO_ITEM: '.todo-item',
    TODO_ITEM_TEMPLATE: '#newTaskTemplate',
    LOADING: '#loading',
    ERROR: '#error',
});

const CLASS = Object.freeze({
    REMOVE_BTN: 'remove-button',
    DONE_BTN: 'done-button',
    DONE: 'done',
    HIDE: 'hide',
});

const list = document.querySelector(SELECTOR.LIST);
const input = document.querySelector(SELECTOR.INPUT);
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
    const classList = e.target.classList;

    if (e.target.classList.contains(CLASS.REMOVE_BTN)) {
        return removeTodo(todoEl);
    }
    if (classList.contains(CLASS.DONE_BTN)) {
        return toggleDone(todoEl);
    }
}

function getTodoElement(target) {
    return target.closest(SELECTOR.TODO_ITEM);
}

function getTodo() {
    return {
        title: input.value,
        status: 'pending',
    };
}

function isTodoValid(todo) {
    return todo && todo.title && todo.title.length >= 3;
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
        .replace('{{doneClass}}', todo.status == 'completed' ? CLASS.DONE : '')
        .replace('{{message}}', todo.title)
        .replace('{{todoId}}', todo.id)
        .replace('{{status}}', todo.status);
}

function removeTodo(el) {
    el.remove();

    TodoAPI
        .delete(+el.dataset.id)
        .catch(handleError)
}

function toggleDone(todoEl) {
    status = todoEl.dataset.status === 'completed' ? 'pending' : 'completed';

    todoEl.classList.toggle(CLASS.DONE);

    TodoAPI
        .update(+todoEl.dataset.id, { status })
        .catch(handleError)
}

function clear() {
    input.value = '';
}

function toggleLoading() {
    loading.classList.toggle(CLASS.HIDE);
}

function handleError(e) {
    error.textContent = e.message;

    setTimeout(() => error.textContent = '', 5000);
}
