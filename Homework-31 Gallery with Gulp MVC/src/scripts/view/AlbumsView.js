class AlbumsView {
    constructor(config) {
        this.config = config;
        this.$el = this.initView();
    }

    initView() {
        return $('<div id = "albums" class = "albums"></div>')
            .on('click', '.album-item', (e) => this.config.onAlbumsSelect($(e.target).data('id')));
    }

    renderList(list) {
        this.$el.html(
            list.map(this.generateAlbumHtml)
                .join('')
        )
    }
    generateAlbumHtml({ id, title }) {
        return `<div class="album-item" data-id = "${id}">${title}</div>`;
    }
}
