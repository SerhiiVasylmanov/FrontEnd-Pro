import $ from "jquery";
import templateFormView from "./FormView.html";

export class FormView {
    constructor(options) {
        this.options = options;
        this.$el = this.initForm();
    }

    initForm() {
        return $(templateFormView).on('submit', this.onFormSubmit.bind(this));
    }

    appendTo($conteiner) {
        this.viewOptions.appendTo($conteiner, this.$el);
    }

    generateMessage(element) {
        return {
            name: element.name.value,
            message: element.message.value
        }
    }

    onFormSubmit(e) {
        e.preventDefault();

        if (this.isFilled(e.target.elements)) {
            const message = this.generateMessage(e.target.elements);

            this.options.submit(message);
            e.target.reset()
        } else {
            alert('Fill in all fields')
        }
    }

    isFilled(element) {
        return !!element.name.value && !!element.message.value;
    }
}
