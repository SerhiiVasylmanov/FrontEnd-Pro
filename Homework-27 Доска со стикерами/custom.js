const TEMPLATE_SELECTOR = '#stickerItemTemplate';
const DELETE_STICKER_SELECTOR = '.delete__btn';
const EDIT_STICKER_CONTROL_SELECTOR = '.sticker__description';
const STICKER_LIST = '.stickers-container';
const ADD_STICKER_BTN = '.header__btn';
const LOADING = '#loading';
const CLASS_HIDE = 'hide';

let stickersArr = [];

const stickerTemplate = $(TEMPLATE_SELECTOR).html();
const $stickerListEl = $('.stickers-container')
    .on('click', DELETE_STICKER_SELECTOR, onDeleteClick)
    .on('focusout', EDIT_STICKER_CONTROL_SELECTOR, onListFocusout);

$(ADD_STICKER_BTN).on('click', onAddStickerClick);

init();

function onAddStickerClick(event) {
    event.preventDefault();
    submitForm();
}

function onDeleteClick(e) {
    const $element = $(this).parent();

    $element.fadeOut(1000, () => deleteSticker(getElementIndex($element)));
}

function onListFocusout(e) {
    const description = $(this);

    saveSticker(getElementIndex(description), {
        description: description.val(),
    });
}

function init() {
    fetchSticker();
}

function fetchSticker() {
    toggleLoading();

    StickerApi.getList()
        .then(setStickers)
        .then(renderList)
        .finally(() => toggleLoading());
}

function setStickers(data) {
    return (stickersArr = data);
}

function getNoteElementById(id) {
    return $stickerListEl.find(`[data-sticker-id="${id}"]`);
}

function createSticker(newSticker) {
    StickerApi.create(newSticker)
        .then(addSticker);
}

function saveSticker(id, changes) {
    const sticker = stickersArr.find((el) => el.id == id);

    Object.keys(changes).forEach((key) => (sticker[key] = changes[key]));
    StickerApi
        .update(id, sticker);
}

function deleteSticker(id) {
    stickersArr = stickersArr.filter((el) => el.id != id);

    deleteStickerElement(id);
    StickerApi
        .delete(id);
}

function deleteStickerElement(id) {
    const $element = getNoteElementById(id);

    $element && $element.remove();
}

function renderList(list) {
    $(STICKER_LIST).html(list.map(getItemHtml).join(''));
}

function submitForm() {
    const newSticker = getFormData();
    createSticker(newSticker);
}

function getFormData() {
    return { description: '' };
}

function addSticker(sticker) {
    stickersArr.push(sticker);
    renderList(stickersArr);
}

function getItemHtml({ description, id }) {
    return stickerTemplate
        .replace('{{description}}', description)
        .replace('{{id}}', id);
}

function getElementIndex($el) {
    const $sticker = getNoteElementByChild($el);

    return $sticker && $sticker.data('stickerId');
}

function getNoteElementByChild($child) {
    return $child.closest('.sticker__item');
}

function toggleLoading() {
    $(LOADING).toggleClass(CLASS_HIDE);
}
