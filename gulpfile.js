'use strict'

//dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');




///////////////
// - SCSS/CSS
///////////////

var SCSS_SRC = './src/Assets/scss/**/*.scss';
var SCSS_DEST = './src/Assets/css';

// Compile SCSS min
gulp.task('compile_scss_min', function () {


  gulp.src(SCSS_SRC)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(changed(SCSS_DEST))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(SCSS_DEST));

});

// Compile SCSS min
gulp.task('compile_scss', function () {

  gulp.src(SCSS_SRC)
    .pipe(sass().on('error', sass.logError))
    .pipe(changed(SCSS_DEST))
    .pipe(gulp.dest(SCSS_DEST));

});


// detect changes in SCSS
gulp.task('watch_scss', function () {
  gulp.watch(SCSS_SRC, ['compile_scss_min', 'compile_scss']);
});


// Run tasks
gulp.task('default', ['watch_scss']);