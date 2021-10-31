const { src, dest, series, parallel } = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const watch = require('gulp-watch');
const uglify = require('gulp-uglify');

function cleanDist() {
    return src('./dist', { read: false, allowEmpty: true }).pipe(clean());
}

function copyJs() {
    return src([
        './src/scripts/api.js',
        './src/scripts/app.js',
    ])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(dest('./dist'));
}

function copyHtml() {
    return src('./src/index.html').pipe(dest('./dist'));
}

function copyStyle() {
    return src('./src/style.css').pipe(dest('./dist'));
}

function watchFiles() {
    return watch([
        './src/**/*.css',
        './src/**/*.js',
        './src/**/*.html',
    ], { ignoreInitial: false }), () => copyJs();
}

module.exports = {
    build: series(cleanDist, parallel(copyHtml, copyJs, copyStyle)),
    serve: series(cleanDist, parallel(copyHtml, copyJs, copyStyle), watchFiles),
}