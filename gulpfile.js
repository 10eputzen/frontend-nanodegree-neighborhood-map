// var changed = require('gulp-changed'),
//     jshint = require('gulp-jshint'),
//     concat = require('gulp-concat'),
//     uglify = require('gulp-uglify'),
//     rename = require('gulp-rename'),
//     imagemin = require('gulp-imagemin'),
//     clean = require('gulp-clean'),
//     minifyhtml = require('gulp-minify-html'),
//     autoprefixer = require('gulp-autoprefixer'),
//     minifyCSS = require('gulp-minify-css');



var gulp = require('gulp');

var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var mainBowerFiles = require('main-bower-files');



// Gulp default task
gulp.task('default', ['minify-css', 'scripts']);

gulp.task('minify-css', function() {
    gulp.src('app/css/*.css')
        .pipe(minifyCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('scripts', function() {
    gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

// gulp.task('html', function() {
//     gulp.src('app/*.html')
//         .pipe(minifyHtml())
//         .pipe(gulp.dest('dist/'));
// });


gulp.task('watch', function() {
    gulp.watch('app/css/*.css', ['minify-css']);
    gulp.watch('scripts/**.js', ['scripts']);
});
