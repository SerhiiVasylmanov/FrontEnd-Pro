"use strict";

const SELECTOR = {
    ID_STICKER_TEMPL: "#sticker-template",
    CLASS_STICKER_CONTAINER: ".stickers-container",
    CLASS_HEADER_BTN: ".header__btn",
    CLASS_STICKER_UPDATE: "updayting",
    CLASS_STICKER: "sticker",
    CLASS_STICKER_BODY: ".sticker-body",
    CLASS_STICKER_CONT: ".sticker__description",
    CLASS_STICKER_BTN: "sticker__btn",
    LOADING: "#loading",
    CLASS_HIDE: "hide",
    ERROR: "#error",
};

const $stickerHTML = $(SELECTOR.ID_STICKER_TEMPL).html();

const ELEMENT = {
    STICKER_CONTAINER: $(SELECTOR.CLASS_STICKER_CONTAINER),
    HEADER_BTN: $(SELECTOR.CLASS_HEADER_BTN),
};

$(document).ready(init);
$(ELEMENT.HEADER_BTN).on('click', onHeaderBTNClick);
$(ELEMENT.STICKER_CONTAINER).on('click', onStickerContainerClick);

function init() {
    toggleLoading();

    DataApi.get()
        .then(createStickers)
        .catch(showError)
        .finally(() => toggleLoading());
}

function onHeaderBTNClick() {
    return ELEMENT.STICKER_CONTAINER.prepend(renderNewStickerHTML);
}

function onStickerContainerClick(e) {
    if ($(e.target).hasClass(SELECTOR.CLASS_STICKER)) {
        const currentSticker = $(e.target).closest(SELECTOR.CLASS_STICKER_BODY);

        addUpdateClass(currentSticker);
        updateSticker(currentSticker);
    }
    if ($(e.target).hasClass(SELECTOR.CLASS_STICKER_BTN)) {
        const sticker = $(e.target).closest(SELECTOR.CLASS_STICKER_BODY);
        const id = $(sticker).attr("data-id");

        if (id == "") {
            deleteStickerFrom(sticker);

            return;
        }
        deleteStickerFrom(sticker);

        DataApi
            .delete(id)
            .catch(showError);
        removeStickerEvent(sticker);
    }
}

function updateSticker(sticker) {
    $(sticker).mouseleave(() => onStickerMousLeave(sticker));
}

function onStickerMousLeave(sticker) {
    const STICKER = {
        id: "",
        description: "",
    };

    STICKER.id = $(sticker).attr("data-id");
    STICKER.description = $(sticker).children(SELECTOR.CLASS_STICKER_CONT).val();

    removeUpdateClass(sticker);

    if (STICKER.description != "") {
        if (STICKER.id == "") {
            DataApi
                .create(STICKER)
                .then(() => init());
            removeStickerEvent(sticker);

            return;
        }
        DataApi
            .update(STICKER, STICKER.id)
            .catch(showError);
        removeStickerEvent(sticker);

        return;
    }
    removeStickerEvent(sticker);
}

function createStickers(data) {
    const stickers = Array.from(data);

    let stickersHTML = stickers
        .map((sticker) => renderStickerHTML(sticker))
        .join("");

    ELEMENT.STICKER_CONTAINER.html(stickersHTML);
}

function renderStickerHTML(sticker) {
    return $stickerHTML
        .replaceAll("{{id}}", sticker.id)
        .replace("{{description}}", sticker.description)
        .replace("{{placeholder}}", "")
        .replace("{{update}}", "");
}

function renderNewStickerHTML() {
    return $stickerHTML
        .replaceAll("{{id}}", "")
        .replace("{{description}}", "")
        .replace("{{placeholder}}", "Enter yor text")
        .replace("{{update}}", SELECTOR.CLASS_STICKER_UPDATE);
}

function addUpdateClass(sticker) {
    $(sticker)
        .children(SELECTOR.CLASS_STICKER_CONT)
        .addClass(SELECTOR.CLASS_STICKER_UPDATE);
}

function removeUpdateClass(sticker) {
    $(sticker)
        .children(SELECTOR.CLASS_STICKER_CONT)
        .removeClass(SELECTOR.CLASS_STICKER_UPDATE);
}

function deleteStickerFrom(sticker) {
    $(sticker).remove();
}

function removeStickerEvent(sticker) {
    $(sticker).off("mouseleave");
}

function showError(e) {
    $(SELECTOR.ERROR).text(e.message);

    setTimeout(() => error.textContent = '', 5000);
}

function toggleLoading() {
    $(SELECTOR.LOADING).toggleClass(SELECTOR.CLASS_HIDE);
}
