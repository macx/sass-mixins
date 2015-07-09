'use strict';

var conf = {
  src: 'src',
  test: 'test'
};

var gulp = require('gulp');
var debug = require('gulp-debug');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var scsslint = require('gulp-scss-lint');
var scssLintStylish = require('gulp-scss-lint-stylish');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

require('gulp-release-tasks')(gulp);

gulp.task('js-lint', function () {
  return gulp.src(['gulpfile.js'])
    .pipe(debug({title: ' @js-lint:'}))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scss-lint', function() {
  return gulp.src([conf.src + '/**/*.scss'])
    .pipe(debug({title: ' @scss-lint:'}))
    .pipe(scsslint({
      maxBuffer: 307200,
      config: '.scss-lint.yml',
      customReport: scssLintStylish
    }));
});

// Build SASS
gulp.task('sass', function(done) {
  gulp.src(conf.src + '/*.scss')
    .pipe(debug({title: ' @sass:'}))
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest(conf.test + '/'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(conf.test + '/'))
    .pipe(reload({
      stream: true
    }))
    .on('end', done);
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'test/'
    }
  });
});

// Default Task
gulp.task('default', [
  'js-lint',
  'scss-lint',
  'sass'
]);

gulp.task('serve', [
  'default',
  'browser-sync'
]);
