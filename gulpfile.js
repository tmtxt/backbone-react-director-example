var gulp = require('gulp');
var react = require('gulp-react');
var plumber = require('gulp-plumber');

gulp.task('jsx', function(){
  gulp.src('site/js/views/*.jsx')
    .pipe(plumber())
    .pipe(react())
    .pipe(gulp.dest('site/js/views'));
});

gulp.task('watch', function(){
  gulp.watch('site/js/views/*.jsx', ['jsx']);
});
