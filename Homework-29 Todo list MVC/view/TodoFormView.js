class TodoFormView {
    static ADD_BTN_SELECTOR = '.addBtn';

    #$listEl;
    #todo;

    constructor(todo) {
        this.#todo = todo;
        this.#$listEl = this.init();

        this.$todoInput = this.#$listEl.find("#todoNameInput");
    }

    init() {
        return $(`<form id="addTodoForm">
                    <input type="text" id="todoNameInput">
                    <input type="submit" class="addBtn" value="Add new todo">
                </form>`)
            .on('click', TodoFormView.ADD_BTN_SELECTOR, (e) => this.onFormSubmit(e));
    }

    appendTo($el) {
        $el.append(this.#$listEl);
    }

    onFormSubmit(e) {
        e.preventDefault();

        const todo = {
            title: this.$todoInput.val(),
            status: 'pending',
        };
        this.#todo.onAdd(todo);
        this.clear();
    }

    clear() {
        this.$todoInput.val("");
    }

    renderElement(todo) {
        const html = this.generateTodoHtml(todo);

        this.#$listEl.find(`[data-id='${todo.id}']`).replaceWith(html);
    }
}
