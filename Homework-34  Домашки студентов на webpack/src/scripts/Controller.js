import Collection from "./Collection";
import ListView from "./view/ListView";
import FormView from "./view/FormView";

class Controller {
    constructor($container) {
        this.$container = $container;

        this.collection = new Collection();
        this.collection.fetch()
            .then(() => this.renderList());

        this.listView = new ListView({
            delete: (id) => this.deleteStudent(id),
            update: (student) => this.updateStudent(student),
        });

        this.formView = new FormView({
            submit: (name) => this.onSubmit(name)
        });

        this.listView.appendTo(this.$container);
    }

    deleteStudent(id) {
        this.collection.delete(id)
            .then(() => this.listView.removeElement(id))
    }

    updateStudent(student) {
        this.collection.update(student)
            .then(() => this.listView.renderStudent(student))
    }

    onSubmit(name) {
        this.collection.add(name)
            .then(res => this.listView.appendStudent(res))
    }

    renderList() {
        this.listView.renderStudents(this.collection.getList());
        this.formView = this.formView.addTrigger();
        this.$container.after(this.formView[0]);
    }
}

export default Controller;
