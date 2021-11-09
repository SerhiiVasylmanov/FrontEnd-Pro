import { FormView } from "./FormView";
import { MessageView } from "./MessageView";

export class MainView {
    constructor($conteiner, option) {
        this.option = option;
        this.$conteiner = $conteiner;
        this.messageView = new MessageView();

        this.formView = new FormView({
            submit: (message) => this.onSubmit(message)
        });

        this.$conteiner.append(
            this.messageView.initMessagPlace(),
            this.formView.initForm());
    }

    onSubmit(message) {
        this.option.submit(message);
    }

    addNewMessage(message) {
        this.messageView.addMessage(message);
    }
}
