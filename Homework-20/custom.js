'use strict'

class Tabs {
    #rootEl;

    static TABS_NAV_CLASS = "tabs-nav";
    static TABS_MAIN_CLASS = "tabs-main";
    static BTN_CLASS = "btn";
    static BTN_ACTIVE_CLASS = "btn-active";
    static CONTENT_CLASS = "body";
    static CONTENT_ACTIVE_CLASS = "active";

    constructor(rootEl) {
        this.#rootEl = rootEl;

        this.bindStyles();
        this.bindEvents();
    }

    bindEvents() {
        const heading = this.findeElementByClass(`.${Tabs.TABS_NAV_CLASS}`);

        heading.addEventListener("click", (e) => this.onHeadingClick(e));
    }

    onHeadingClick(e) {
        if (e.target.classList.contains(Tabs.BTN_CLASS)) {
            const buttonIndex = this.findeBtnByCount(e);
            const targetContent = this.findeContentByIndex(buttonIndex);

            this.btnAddOpenClass(e);
            this.btnRemoveOpenClass(buttonIndex);

            this.targetContentAddClass(targetContent);
            this.closeContents(buttonIndex);
        }
    }

    findeElementByClass(className) {
        return this.#rootEl.querySelector(className);
    }

    findeBtnByCount(e) {
        return e.target.getAttribute("data-btn");
    }

    findeContentByIndex(index) {
        return this.#rootEl.querySelector(`.${Tabs.CONTENT_CLASS}_${index}`);
    }

    btnAddOpenClass(e) {
        e.target.classList.add(Tabs.BTN_ACTIVE_CLASS);
    }

    targetContentAddClass(el) {
        el.classList.add(Tabs.CONTENT_ACTIVE_CLASS);
    }

    btnRemoveOpenClass(index) {
        const buttons = this.findeElementByClass(`.${Tabs.TABS_NAV_CLASS}`).children;

        for (let el of buttons) {
            if (index != el.getAttribute("data-btn")) {
                el.classList.remove(Tabs.BTN_ACTIVE_CLASS);
            }
        }
    }

    closeContents(index) {
        const contents = this.findeElementByClass(`.${Tabs.TABS_MAIN_CLASS}`).children;

        for (let el of contents) {
            if (!el.classList.contains(`${Tabs.CONTENT_CLASS}_${index}`)) {
                el.classList.remove(Tabs.CONTENT_ACTIVE_CLASS);
            }
        }
    }

    bindStyles() {
        const tabsItems = this.#rootEl.children;
        const [navEl, mainEl] = tabsItems;

        navEl.classList.add(Tabs.TABS_NAV_CLASS);
        mainEl.classList.add(Tabs.TABS_MAIN_CLASS);

        const btn = Array.from(navEl.children);

        for (let i = 0; i < btn.length; i++) {
            btn[i].classList.add(Tabs.BTN_CLASS);
            btn[i].setAttribute("data-btn", `${i + 1}`);
        }

        btn[0].classList.add(Tabs.BTN_ACTIVE_CLASS);

        const content = Array.from(mainEl.children);

        for (let el of content) {
            el.classList.add(
                Tabs.CONTENT_CLASS,
                Tabs.CONTENT_CLASS + `_${content.indexOf(el) + 1}`
            );
        }

        content[0].classList.add(Tabs.CONTENT_ACTIVE_CLASS);
    }
}

const tabsEl = document.querySelector("#tabs");

new Tabs(tabsEl);