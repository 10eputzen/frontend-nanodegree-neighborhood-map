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
var gulpFilter = require('gulp-filter');
var webpack = require('webpack-stream');
var less = require('gulp-less');

// Gulp default task
gulp.task('default', ['minify-css', 'scripts','main-bower-files','copy-bs-fonts']);

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


gulp.task('main-bower-files', function() {
	var filterJS = gulpFilter('**/*.js', { restore: true });
	var filterCSS = gulpFilter('**/*.less', { restore: true });
    return gulp.src(mainBowerFiles(/* options */), { base: 'app/bower_components' })
    	.pipe(filterJS)
    	.pipe(uglify())
    	.pipe(filterJS.restore)

    	.pipe(filterCSS)
    	.pipe(less())
    	.pipe(minifyCSS())
    	.pipe(filterCSS.restore)

        .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('copy-bs-fonts', function(){
  return gulp.src('app/bower_components/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest('dist/bower_components/bootstrap/fonts/'));
});

