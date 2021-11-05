import $ from 'jquery';

class ListView {
    static BTN_DELETE_SELECTOR = '.delete';
    static INPUT_SELECTOR = '.input';
    static STUDENTS_LIST_SELECTOR = '#students_list';
    static STUDENT_SELECTOR = '.student';

    constructor(options) {
        this._options = options;
        this._$el = this.initList();
        this.list = this._$el.find(ListView.STUDENTS_LIST_SELECTOR);
    }

    initList() {
        return $(`<table class="table">
                 <thead class="table-header">
                     <th>Name</th>
                     <th colspan="10">Marks</th>
                     <th>Action</th>
                 </thead>
                 <tbody id="students_list"></tbody>
             </table>  `)
            .on('focusout', ListView.INPUT_SELECTOR, this.onFoucsOutInput.bind(this))
            .on('click', ListView.BTN_DELETE_SELECTOR, this.onDeleteBtnClick.bind(this));
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
        return e.closest(ListView.STUDENT_SELECTOR);
    }

    findStudentId(student) {
        const currentStudent = this.findStudent(student);

        return currentStudent.dataset.id;
    }

    renderStudents(item) {
        const itemHtml = item.map((elem) => this.generateItem(elem))
        this.list.html(itemHtml)
    }

    renderStudent(student) {
        this.list.find(`[data-id="${student.id}"]`).replaceWith(student);
    }

    appendStudent(res) {
        const newStudent = this.generateItem(res);

        this.appendTo($(ListView.STUDENTS_LIST_SELECTOR), newStudent);
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
                    <td class="action-btn">
                        <button class="delete">x</button>
                    </td>
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

export default ListView;