'use strict';

var conf = {
  src: 'src',
  test: 'test'
};

var gulp = require('gulp'),
    sass        = require('gulp-sass'),
    cssmin      = require('gulp-cssmin'),
    rename      = require('gulp-rename'),
    bump        = require('gulp-bump'),
    git         = require('gulp-git'),
    jshint      = require('gulp-jshint'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload;

var getPackageJson = function () {
  var fs = require('fs');

  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};

gulp.task('lint', function () {
  gulp.src(['gulpfile.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
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

/**
 * Release Task
 * @usage gulp release --type patch|minor|major
 */
gulp.task('release', ['default'], function () {
  // load dependencies
  var semver = require('semver'),
      gutil  = require('gulp-util');

  var bumpType   = gutil.env.type || 'patch',
      pkg        = getPackageJson(),
      newVersion = semver.inc(pkg.version, bumpType);

  if(!newVersion) {
    gutil.log(gutil.colors.red('Please choose a valid type: patch, minor or major'));
    return false;
  }

  var version = 'v' + newVersion,
      message = 'Release ' + version;

  // bump the version to local files
  gulp.src(['./package.json', './bower.json'])
    .pipe(bump({
      type: bumpType,
      version: newVersion
    }))
    .pipe(gulp.dest('./'));

  // commit changes
  gulp.src('./*')
    .pipe(git.add({args: '-f -p'}))
    .pipe(git.commit(message));

  git.tag(version, message, function (err) {
    if(err) { throw err; }
  });

  git.push('origin', 'master', {args: '--tags'}, function (err) {
    if(err) { throw err; }
  });
});

// Default Task
gulp.task('default', [
  'lint',
  'sass',
  'cssmin'
]);

gulp.task('serve', [
  'default',
  'browser-sync'
]);
