var conf = {
  src: 'src',
  test: 'test'
};

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    bump = require('gulp-bump');

// Build SASS
gulp.task('sass', function () {
  gulp.src('<%= conf.src %>/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('<%= conf.test %>/sass-mixins.css'));
});

// Release a new version
gulp.task('release', function(){
  gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type:'patch'}))
    .pipe(gulp.dest('./'));
});

// Default Task
gulp.task('default', [
  'sass'
]);
