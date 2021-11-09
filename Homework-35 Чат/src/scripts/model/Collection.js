export class Collection {
    constructor(url, option) {
        this._url = url;
        this.option = option;

        this.socket = new WebSocket(this._url);
        this.socket.onmessage = (msg) => this.showMessage(msg);
        this.socket.onclose = this.connectAgain();

    }

    prepareMessage(message) {
        return JSON.stringify(message);
    }

    send(message) {
        if (this.isOpened) {
            this.socket.send(this.prepareMessage(message));
        }
    }

    isOpened() {
        return !!this.socket.onopen;
    }

    showMessage(msg) {
        this.option.getMessage(JSON.parse(msg.data));
    }

    connectAgain() {
        this.socket = new WebSocket(this._url);
    }
}