'use strict';

var conf = {
  src: 'src',
  test: 'test'
};

var gulp   = require('gulp'),
    sass   = require('gulp-sass'),
    bump   = require('gulp-bump'),
    git    = require('gulp-git'),
    jshint = require('gulp-jshint');

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
    .pipe(gulp.dest(conf.test + '/'));
});

gulp.task('bump', function () {
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

  // bump the version to local files
  gulp.src(['./bower.json', './package.json'])
    .pipe(bump({
      type:'patch',
      version: 'v' + newVersion
    }))
    .pipe(gulp.dest('./'));

  // add and commit changes to the repository
  gulp.src('./*')
    .pipe(git.add({args: '-f --all'}))
    .pipe(git.commit('v' + newVersion))
    .pipe(git.tag('v' + newVersion, 'v' + newVersion, function (err) {
      if(err) {
        throw err;
      }
    }))
    .pipe(git.push('origin', 'master', function (err) {
      if(err) {
        throw err;
      }
    }));
});

// Default Task
gulp.task('default', [
  'lint',
  'sass'
]);

// Release Task
gulp.task('release', [
  'default',
  'bump'
]);
