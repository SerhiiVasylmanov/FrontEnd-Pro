class Tabs {
    #rootEl;

    static ITEM_CLASS = 'tabs-item';
    static HEADER_CLASS = 'tabs-item-header';
    static BODY_CLASS = 'tabs-item-body';
    static OPEN_CLASS = 'open';

    constructor(rootEl) {
        this.#rootEl = rootEl;

        this.bindStyles();
        this.bindEvents();
    }

    bindEvents() {
        this.#rootEl.addEventListener('click', (e) => this.onRootElClick(e));
    }

    onRootElClick(e) {
        if (e.target.classList.contains(Tabs.HEADER_CLASS)) {
            const headerEl = e.target;
            const bodyEl = this.findBody(headerEl);
            const openEl = this.findOpenBody();

            if (openEl && openEl !== bodyEl) {
                this.closeBody(openEl);
            }

            this.toogleBody(bodyEl);
        }
    }

    toogleBody(el) {
        el.classList.toggle(Tabs.OPEN_CLASS);
    }

    findOpenBody() {
        return this.#rootEl.querySelector('.' + Tabs.OPEN_CLASS);
    }

    closeBody(el) {
        el.classList.remove(Tabs.OPEN_CLASS);
    }

    findBody(el) {
        const itemEl = el.closest('.' + Tabs.ITEM_CLASS);

        return itemEl.querySelector('.' + Tabs.BODY_CLASS);
    }

    bindStyles() {
        const tabsItems = this.#rootEl.children;

        for (let itemEl of tabsItems) {
            const [headerEl, bodyEl] = itemEl.children;

            itemEl.classList.add(Tabs.ITEM_CLASS);
            headerEl.classList.add(Tabs.HEADER_CLASS);
            bodyEl.classList.add(Tabs.BODY_CLASS);
        }
    }
}

const tabsEl = document.querySelector('.tabs-wrapper');
new Tabs(tabsEl);