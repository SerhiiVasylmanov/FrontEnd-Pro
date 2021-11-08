const { src, dest, series, parallel, watch } = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const { reload } = require('browser-sync');
const browseSync = require('browser-sync').create();
const { path } = require('./gulp/const')

function cleanDist() {
    return src(path.dest, { read: false, allowEmpty: true }).pipe(clean());
}

function copyJs() {
    return src(path.srcJs)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(path.dest));
}

function copyVendorJs() {
    return src(path.srcVendorjs)
        .pipe(concat('vendor.js'))
        .pipe(dest(path.dest));
}

function copyHtml() {
    return src(path.srcHtml).pipe(dest(path.dest));
}

function copyStyle() {
    return src(path.srcStyle)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(concat('app.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(path.dest));
}

function build() {
    return series(
        cleanDist,
        parallel(
            copyHtml,
            copyJs,
            copyStyle,
            copyVendorJs
        )
    );
}

function server(done) {
    browseSync.init({
        server: {
            baseDir: path.dest,
        }
    });

    watch('./src/index.html', series(copyHtml, reloadBrowser));
    watch('./src/scripts/**/*.js', series(copyJs, reloadBrowser));
    watch('./src/style/**/*.css', series(copyStyle, reloadBrowser));

    done();
}

function reloadBrowser(done) {
    browseSync.reload();
    done()
}

function serve() {
    return series(build(), server);
}

module.exports.build = build();
module.exports.serve = serve();
