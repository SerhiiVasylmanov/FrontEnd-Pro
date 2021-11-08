const STUDENT_SELECTOR = '.student';

class Controller {
    constructor($container) {
        this.$container = $container;

        this.studentsCollection = new Collection();
        this.studentsCollection.fetch()
            .then(() => this.renderList());

        this.studentsListView = new StudentsView({
            delete: (id) => this.deleteStudent(id),
            update: (student) => this.updateStudent(student),
        });

        this.newFormStudent = new NewStudentFormView({
            submit: (name) => this.onSubmit(name)
        });

        this.studentsListView.appendTo(this.$container);
    }

    deleteStudent(id) {
        this.studentsCollection.delete(id)
            .then(() => this.studentsListView.removeElement(id))
    }

    updateStudent(student) {
        this.studentsCollection.update(student)
            .then(() => this.studentsListView.renderStudent(student))
    }

    onSubmit(name) {
        this.studentsCollection.add(name)
            .then(res => this.studentsListView.appendStudent(res))
    }

    renderList() {
        this.studentsListView.renderStudents(this.studentsCollection.getList());
        this.newStudentForm = this.newFormStudent.addTrigger();
        this.$container.after(this.newStudentForm[0]);
    }
}
