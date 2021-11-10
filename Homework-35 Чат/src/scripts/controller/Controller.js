import { Collection, Http } from "../model/Collection";
import { MainView } from "../View/MainView";
import { API_URL } from '../options';

export class Controller {
    constructor($el) {
        this._$el = $el;
        this.view = new MainView(this._$el, {
            submit: (message) => this.sendMessage(message)
        })
        this.collection = new Collection(API_URL, {
            getMessage: (message) => this.showMessage(message)
        });
    }

    sendMessage(message) {
        this.collection.send(message);
    }

    showMessage(message) {
        this.view.addNewMessage(message);
    }
}