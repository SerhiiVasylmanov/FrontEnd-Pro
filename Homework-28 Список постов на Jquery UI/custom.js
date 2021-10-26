const SELECTOR = Object.freeze({
    ADD_BTN: '#addBtn',
    EDIT_BTN: '.edit-btn',
    DELETE_BTN: '.delete-btn',
    MODAL: '#postModal',
    POST_ITEM: '.post-item',
    POST_ITEM_TPL: '#postItemTemplate',
    POST_LIST: '#postListContainer',
});
const NEW_POST = {
    id: '',
    title: '',
    body: ''
};

const $postListEl = $(SELECTOR.POST_LIST);
const modal = new FormModal($(SELECTOR.MODAL), savePost);
let posts = [];

$(SELECTOR.ADD_BTN).on('click', onAddBtnClick)
$postListEl
    .on('click', SELECTOR.EDIT_BTN, onEditBtnClick)
    .on('click', SELECTOR.DELETE_BTN, onDeleteBtnClick);

init();

function init() {
    PostApi.getList()
        .then(setPosts)
        .then(addPostListOnUI);
}

function onAddBtnClick() {
    modal.open(NEW_POST);
}

function onEditBtnClick(e) {
    const id = findPostItemElIndex(e.target);
    const post = findPost(id);

    modal.open(post);
}

function onDeleteBtnClick(e) {
    const id = findPostItemElIndex(e.target);
    const $postEl = findPostItemElByIndex(id);

    post = posts.filter(post => +post.id !== +id);

    $postEl.remove();
    PostApi.delete(id);
}

function savePost(post) {
    if (!isValidPost(post)) {
        return alert('Post Title and Body required');
    }

    if (post.id) {
        updatePost(post.id, post);
    } else {
        createPost(post);
    }

    modal.close();
}

function createPost(post) {
    PostApi.create(post).then((newPost) => {
        posts.push(newPost);
        addPostOnUI(newPost);
    })
}

function updatePost(id, data) {
    const post = findPost(id);

    Object.keys(data).forEach(key => post[key] = data[key]);

    updatePostOnUI(id, post);
    PostApi.update(id, post);
}

function addPostListOnUI(list) {
    list.forEach(addPostOnUI);
}

function addPostOnUI(post) {
    const $postEl = $(generatePostHTML(post));

    $postListEl.append($postEl);
}

function updatePostOnUI(id, post) {
    const $oldPostEl = findPostItemElByIndex(id);
    const $newPostEl = $(generatePostHTML(post));

    $oldPostEl.replaceWith($newPostEl);
}

function generatePostHTML(post) {
    let html = $(SELECTOR.POST_ITEM_TPL).html();

    for (const [key, val] of Object.entries(post)) {
        html = html.replace(`{{${key}}}`, val);
    }

    return html;
}

function findPostItemElByIndex(id) {
    return $postListEl.find(`[data-id="${id}"]`)?.closest(SELECTOR.POST_ITEM);
}

function findPostItemElIndex(el) {
    return el.closest(SELECTOR.POST_ITEM)?.dataset?.id;
}

function findPost(id) {
    return posts.find(post => +post.id === +id);
}

function setPosts(list) {
    return posts = list;
}

function isValidPost(post) {
    return !Validation.isEmpty(post.title) && !Validation.isEmpty(post.body);
}
