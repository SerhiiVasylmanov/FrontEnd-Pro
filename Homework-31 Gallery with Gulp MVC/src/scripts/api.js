class GalleryApi {
    static ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';
    static PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?albumId=';

    static getList() {
        return fetch(`${this.ALBUMS_URL}`)
            .then((res) => res.json());
    }

    static getPhotos(id) {
        return fetch(`${this.PHOTOS_URL}${id}`)
            .then((resp) => resp.json());
    }
}
