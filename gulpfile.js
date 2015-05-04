'use strict';

var conf = {
  src: 'src',
  test: 'test'
};

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    cssmin      = require('gulp-cssmin'),
    rename      = require('gulp-rename'),
    bump        = require('gulp-bump'),
    git         = require('gulp-git'),
    jshint      = require('gulp-jshint'),
    scsslint    = require('gulp-scss-lint'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload;

require('gulp-release-tasks')(gulp);

var getPackageJson = function () {
  var fs = require('fs');

  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};

gulp.task('js-lint', function () {
  return gulp.src(['gulpfile.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scss-lint', function() {
  return gulp.src([conf.src + '/**/*.scss'])
    .pipe(scsslint({
      'bundleExec': false,
      'config': '.scss-lint.yml',
      'reporterOutput': null
    }))
    .pipe(scsslint.failReporter());
});

// Build SASS
gulp.task('sass', function () {
  gulp.src(conf.src + '/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(conf.test + '/'))
    .pipe(cssmin())
    .pipe(reload({stream: true}));
});

gulp.task('cssmin', function () {
  gulp.src([conf.test + '/*.css', '!' + conf.test + '/*.min.css'])
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(conf.test + '/'));
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
  'sass',
  'cssmin'
]);

gulp.task('serve', [
  'default',
  'browser-sync'
]);
