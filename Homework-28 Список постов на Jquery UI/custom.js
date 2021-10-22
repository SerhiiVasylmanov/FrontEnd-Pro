const TEMPLATE_SELECTOR = '#post-template';
const TABLE_POST = '#table-post';
const LIST_POST = '#list-post';
const INPUT_ITEM = '#input-post-info';
const INPUT_POST_TITLE = '#input-post-title';
const INPUT_POST_BODY = '#input-post-body';
const ADD_POST_BTN = '#add-post-btn';
const EDIT_POST_BTN = '.button-edit-post';
const DELETE_POST_BTN = '.button-delete-post';
const POST_ITEM = '.post-item';
const LOADING = '#loading';
const ERROR = '#error';
const CLASS_HIDE = 'hide';
const MODAL_SELECTOR = '#postModal';

const EMPTY_POST = {
    id: '',
    body: '',
    title: '',
};
let postsList = [];

const postTemplate = $(TEMPLATE_SELECTOR).html();
const $postListEl = $(LIST_POST)
    .on('click', DELETE_POST_BTN, onDeleteClick)
    .on('click', EDIT_POST_BTN, onEditButtonClick);

$(ADD_POST_BTN).on('click', onAddPostButtonClick);

init();

const $form = $(`${MODAL_SELECTOR} form`)[0];
const $modal = $(MODAL_SELECTOR).dialog({
    autoOpen: false,
    height: 400,
    width: 350,
    modal: true,
    buttons: {
        Save: () => {
            const post = getModalPost();

            if (post.id) {
                updatePost(post.id, post);
            } else {
                createPost(post);
            }
            closeModal();
        },
        Cancel: closeModal,

    },
    close: closeModal,
});

function onAddPostButtonClick() {
    openModal(EMPTY_POST);
}

function onDeleteClick(e) {
    const $element = $(this).parent();

    $element.fadeOut(1000, () => deletePost(getElementIndex($element)));
}

function onEditButtonClick(e) {
    const $input = $(this);
    const id = getElementIndex($input);
    const post = postsList.find((item) => +item.id === id);

    openModal(post);
}

function init() {
    getList();
}

function getList() {
    PostApi.getList()
        .then(setData)
        .then(renderList)
}

function setData(data) {
    return postsList = data;
}

function getPostElementById(id) {
    return $postListEl.find(`[data-post-index="${id}"]`);
}

function createPost(post) {
    PostApi.create(post)
        .then((post) => {
            postsList.push(post);
            renderPost(post);
        });
}

function updatePost(id, changes) {
    const post = postsList.find((el) => el.id == id);

    Object.keys(changes).forEach((key) => (post[key] = changes[key]));
    PostApi.update(id, post);
}


function deletePost(id) {
    postsList = postsList.filter((el) => el.id != id);

    deletePostElement(id);
    PostApi.delete(id);
}

function deletePostElement(id) {
    const $element = getPostElementById(id);

    $element && $element.remove();
}

function renderList(postsList) {
    postsList.forEach(renderPost);
}

function renderPost(post) {
    const $postElement = $(getPostHtml(post));

    $postListEl.append($postElement);
}

function getPostHtml(post) {
    return postTemplate
        .replace('{{id}}', post.id)
        .replace('{{id}}', post.id)
        .replace('{{title}}', post.title)
        .replace('{{body}}', post.body);
}

function getElementIndex($el) {
    const $post = getPostElementByChild($el);

    return $post && $post.data('postIndex');
}

function getPostElementByChild($child) {
    return $child.closest(POST_ITEM);
}

function openModal(post) {
    setModalPost(post);
    $modal.dialog("open")
}

function closeModal() {
    $modal.dialog("close");
    $form.reset();
}

function setModalPost(post) {
    $form.id.value = post.id;
    $form.title.value = post.title;
    $form.body.value = post.body;
}

function getModalPost() {
    return {
        ...EMPTY_POST,
        id: $form.id.value,
        title: $form.title.value,
        body: $form.body.value,
    };
}

function toggleLoading() {
    $(LOADING).toggleClass(CLASS_HIDE);
}

function handleError(e) {
    error.textContent = e.message;

    setTimeout(() => error.textContent = '', 5000);
}
