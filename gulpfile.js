var JS_SRC_DEST = './src/',
    CSS_FRAMEWORK_DEST = './build/css-framework',
    JS_BUILD_DEST = './build/';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    clean_css = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    replace = require('gulp-replace');

gulp.task('fonts', function() {
    return gulp.src('./bower_components/font-source-sans-pro/**/*')
        .pipe(gulp.dest('build/fonts'))
});

gulp.task('css-framework', function() {
    return gulp.src('./bower_components/skeleton/css/*.css')
        .pipe(concat('index.css'))
        .pipe(clean_css({compatibility: 'ie8'}))
        .pipe(rename('index.min.css'))
        .pipe(gulp.dest(CSS_FRAMEWORK_DEST));
});

gulp.task('js-framework', function() {

    var framework = gulp.src('./bower_components/knockout/dist/knockout.js')
        .pipe(gulp.dest(JS_BUILD_DEST + 'js-framework'));

    var plugins = gulp.src('./bower_components/knockout-dragdrop/lib/knockout.dragdrop.js')
        .pipe(uglify())
        .pipe(gulp.dest(JS_BUILD_DEST + 'js-framework'));

    return Array.prototype.concat(framework, plugins);
});

gulp.task('less', function () {
    gulp.src(JS_SRC_DEST + 'less/*.less')
        .pipe(less())
        .pipe(concat('production.css'))
        .pipe(clean_css({compatibility: 'ie8'}))
        .pipe(rename('production.min.css'))
        .pipe(gulp.dest(JS_BUILD_DEST + 'css'))
});

gulp.task('js', function () {
    gulp.src(JS_SRC_DEST + 'js/**/*.*')
        .pipe(concat('production.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(JS_BUILD_DEST + 'js'));
});

gulp.task('html', function () {
    gulp.src('index.html')
        .pipe(replace(/\.\/build\//g, './'))
        .pipe(gulp.dest(JS_BUILD_DEST));
});

gulp.task('live', function() {
    gulp.run('fonts');
    gulp.run('js-framework');
    gulp.run('css-framework');
    gulp.run('js');
    gulp.run('html');

    gulp.watch(JS_SRC_DEST + 'js/**/*', function() {
        gulp.run('js');
    });

    gulp.watch('index.html', function() {
        gulp.run('html');
    });

    gulp.watch(JS_SRC_DEST + 'less/*.less', function() {
        gulp.run('less');
    });
});