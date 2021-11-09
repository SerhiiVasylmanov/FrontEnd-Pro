import $ from 'jquery'
import { MESSAGE_PLACE_SELECTOR } from '../options';
import templateMessageView from './MessageView.html';
import temlateNewMessageView from './NewMessageView.html';

export class MessageView {
    constructor(options) {
        this._$el = this.initMessagPlace();
    }

    initMessagPlace() {
        return templateMessageView;
    }

    appendTo($conteiner, el) {
        $conteiner.append(el);
    }

    generateMessage(data) {
        let res = temlateNewMessageView;

        for (const [key, value] of Object.entries(data)) {
            res = res.replaceAll(`{{${key}}}`, value);
        }

        return res;
    }

    addMessage(message) {
        this.appendTo($(MESSAGE_PLACE_SELECTOR), this.generateMessage(message));
    }
}
