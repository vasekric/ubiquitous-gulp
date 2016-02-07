'use strict';
// ↓ ↓ ↓ ↓ DEPENDENCIES ↓ ↓ ↓ ↓
var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({browsers: ["last 3 versions"]});
var connect = require('gulp-connect');

// ↓ ↓ ↓ ↓ CUSTOMIZABLE PROPERTIES ↓ ↓ ↓ ↓
var lessFiles = './templates/css/src/**/*.less';
var cssOutput = './templates/css/build/';
var htmlFiles = './templates/html/*.html';
var jsFiles = './templates/js/*.js';

// ↓ ↓ ↓ ↓ DEFINED GULP TASKS ↓ ↓ ↓ ↓
gulp.task('less', compileLess);
gulp.task('watch-less', watchLess);
gulp.task('watch', watch);
gulp.task('server', server);
gulp.task('html', html);
gulp.task('js', js);

// ↓ ↓ ↓ ↓ FUNCTIONS USED BY GULP TASKS ↓ ↓ ↓ ↓
function compileLess() {
    return gulp.src(lessFiles)
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')],
            plugins: [autoprefix]
        }))
        .on("error", handleError)
        .pipe(concat('style.css'))
        .pipe(gulp.dest(cssOutput))
        .pipe(minifyCss({
            advanced: true,

        }))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(cssOutput))
        .pipe(connect.reload())
}
function watchLess() {
    compileLess();
    gulp.watch(lessFiles, ['less']);
}
function watch() {
    compileLess();
    gulp.watch([htmlFiles], ['html']);
    gulp.watch([lessFiles], ['less']);
    gulp.watch([lessFiles], ['js']);
}
function html() {
    gulp.src(htmlFiles)
        .pipe(connect.reload());
}
function js() {
    gulp.src(jsFiles)
        .pipe(connect.reload());
}
function server() {
    connect.server({
        root: ['templates/html', 'templates'],
        port: 8001,
        livereload: true
    });
    watch();
}
function handleError(err) {
    console.log(err);
    this.emit('end');
}