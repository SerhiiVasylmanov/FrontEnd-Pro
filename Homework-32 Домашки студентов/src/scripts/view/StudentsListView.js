const BTN_DELETE_SELECTOR = '.delete';
const INPUT_SELECTOR = '.input';
const STUDENTS_LIST_SELECTOR = '.students_list';
const HEADER_SELECTOR = '.header';

class StudentsView {
    constructor(options) {
        this._options = options;
        this._$el = this.initList();
        this.list = [];
    }

    initList() {
        return $(`<table class="students_list"></table>`)
            .on('focusout', INPUT_SELECTOR, this.onFoucsOutInput.bind(this))
            .on('click', BTN_DELETE_SELECTOR, this.onDeleteBtnClick.bind(this));
    }

    appendTo($container, el = this._$el) {
        return $container.append(el);
    }

    onFoucsOutInput(e) {
        e.stopPropagation();

        e.target.defaultValue = e.target.value;
        const currentStudent = this.findStudent(e.target);

        this._options.update(currentStudent);
    }

    onDeleteBtnClick(e) {
        e.stopPropagation();

        const currentStudentId = this.findStudentId(e.target);

        this._options.delete(currentStudentId);
    }

    removeElement(id) {
        this._$el.find(`[data-id="${id}"]`).remove();
    }

    findStudent(e) {
        return e.closest(STUDENT_SELECTOR);
    }

    findStudentId(student) {
        const currentStudent = this.findStudent(student);

        return currentStudent.dataset.id;
    }

    setList(data) {
        this.list = data;
    }

    renderStudents(item) {
        const itemHtml = item.map((elem) => this.generateItem(elem))
        this._$el.html(itemHtml)
    }

    renderStudent(student) {
        this._$el.find(`[data-id="${student.id}"]`).replaceWith(student);
    }

    appendStudent(res) {
        const newStudent = this.generateItem(res);

        this.appendTo($(STUDENTS_LIST_SELECTOR), newStudent);
    }

    generateItem(item) {
        if (!!item.marks) {
            return `<tr class="student" data-id = ${item.id}>
                    <td class="name">${item.name}</td>
                    ${this.isArray(item.marks).map(element => {
                return `<td>
                                    <input
                                    type="number"
                                    class="input"
                                    value="${element}">
                                </td>`
            })}
                    <td class="delete">X</td>
                </tr>`
        }
    }

    isArray(array) {
        if (!Array.isArray(array)) {
            return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        } else {
            return array;
        }
    }
}