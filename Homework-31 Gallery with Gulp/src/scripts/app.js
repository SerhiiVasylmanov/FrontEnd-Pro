const SELECTOR = Object.freeze({
    ALBUM_ITEM_TEMPL: '#albumItem',
    PHOTO_ITEM_TEMPL: '#photoItem',
    ALBUM: '#album',
    PHOTO: '#photo',
    LOADING: '#loading',
});

const CLASS = Object.freeze({
    ALBUM_ITEM: 'album-item',
    HIDE: 'hide',
});

const albumsEl = document.querySelector(SELECTOR.ALBUM);
const photosEl = document.querySelector(SELECTOR.PHOTO);
const albumItemTemplate = document.querySelector(SELECTOR.ALBUM_ITEM_TEMPL).innerHTML;
const photoItemTemplate = document.querySelector(SELECTOR.PHOTO_ITEM_TEMPL).innerHTML;
const loading = document.querySelector(SELECTOR.LOADING);

albumsEl.addEventListener('click', onClick);

init();

function init() {
    toggleLoading();

    GalleryApi.getList().then((albumsList) => {
        renderAlbums(albumsList);
        return albumsList;
    })
        .then(getFirstPhotos)
        .finally(() => toggleLoading());
}

function getAlbums() {
    GalleryApi.getList().then((albumsList) => {
        renderAlbums(albumsList);
        return albumsList;
    });
}

function renderAlbums(data) {
    albumsEl.innerHTML = data
        .map((album) => createAlbum(album))
        .join('');
}

function createAlbum(album) {
    return albumItemTemplate
        .replace('{{id}}', album.id)
        .replace('{{title}}', album.title);
}

function getFirstPhotos(data) {
    if (data.length) {
        return getPhotos(data[0].id);
    }
}

function getPhotos(id) {
    toggleLoading();

    GalleryApi.getPhotos(id)
        .then(renderPhotos)
        .finally(() => toggleLoading());
}

function renderPhotos(data) {
    photosEl.innerHTML = data
        .map((photo) => createPhoto(photo))
        .join('');
}

function createPhoto(photo) {
    return photoItemTemplate
        .replace('{{url}}', photo.thumbnailUrl)
        .replace('{{title}}', photo.title);
}

function onClick(e) {
    if (e.target.classList.contains(CLASS.ALBUM_ITEM)) {
        getPhotos(e.target.dataset.id);
    }
}

function toggleLoading() {
    loading.classList.toggle(CLASS.HIDE);
}
