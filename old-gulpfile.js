// Plugins for development
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync  = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    wait = require('gulp-wait'),
    rename = require('gulp-rename'),
    run = require('run-sequence');

gulp.task('server', function () {
  browserSync.init({
    server: 'src/',
    notify: false,
    cors: true,
    ui: false
  });
});

gulp.task('sass', function () {
  gulp.src(['src/sass/**/*.scss', '!src/sass/**/_*.scss'])
    .pipe(plumber())
    .pipe(wait(500))
    .pipe(sass())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('default', function (done) {
  run(['sass', 'server'], 'watch',
    done
  )
});