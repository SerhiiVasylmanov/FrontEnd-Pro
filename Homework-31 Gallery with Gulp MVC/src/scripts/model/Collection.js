class Collection {
    constructor() {
        this.list = [];
    }

    getList() {
        return GalleryApi.getList()
            .then((data) => this.setData(data));
    }
    setData(data) {
        this.list = data;
    }

    getPhotos(id) {
        return GalleryApi.getPhotos(id)
            .then((data) => this.setData(data));
    }
}
