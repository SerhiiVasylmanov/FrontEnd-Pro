class AlbumsController {
    constructor($container) {
        this.$container = $container;

        this.albumsView = new AlbumsView({
            onAlbumsSelect: (id) => this.getAlbumPhotos(id)
        });

        this.photosView = new PhotosView({});

        this.$container
            .append(this.albumsView.$el)
            .append(this.photosView.$el);

        this.Collection = new Collection();

        this.init();
    }

    init() {
        this.Collection.getList()
            .then(() => {
                this.albumsView.renderList(this.Collection.list);
                this.getAlbumPhotos(this.Collection.list[0].id);
            });
    }

    getAlbumPhotos(id) {
        this.Collection.getPhotos(id).then(() => {
            this.photosView.renderList(this.Collection.list);
        });
    }
}
