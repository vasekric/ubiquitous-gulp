'use strict';
// ↓ ↓ ↓ ↓ DEPENDENCIES ↓ ↓ ↓ ↓
var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });
var connect = require('gulp-connect');

// ↓ ↓ ↓ ↓ CUSTOMIZABLE PROPERTIES ↓ ↓ ↓ ↓
var lessFiles = './templates/css/src/**/*.less';
var cssOutput = './templates/css/build/';
var htmlFiles = './templates/html/*.html';

// ↓ ↓ ↓ ↓ DEFINED GULP TASKS ↓ ↓ ↓ ↓
gulp.task('less', compileLess);
gulp.task('watch-less', watchLess);
gulp.task('watch', watch);
gulp.task('server', function() {
    connect.server({
        root: ['templates/html', 'templates'],
        port: 8001,
        livereload: true
    });
    watch();
});
gulp.task('html', function () {
    gulp.src(htmlFiles)
        .pipe(connect.reload());
});

// ↓ ↓ ↓ ↓ FUNCTIONS FOR GULP TASKS ↓ ↓ ↓ ↓
function compileLess() {
    return gulp.src(lessFiles)
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ],
            plugins: [autoprefix]
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(cssOutput))
        .pipe(minifyCss())
        .pipe(gulp.dest(cssOutput))
        .pipe(connect.reload());
}
function watchLess() {
    compileLess();
    gulp.watch(lessFiles, ['less']);
}
function watch() {
    gulp.watch([htmlFiles], ['html']);
    gulp.watch([lessFiles], ['less']);
}