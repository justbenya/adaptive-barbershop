var gulp = require("gulp");
var sass = require("gulp-sass");
var watch = require("gulp-watch");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var run = require("run-sequence");
var wait = require("gulp-wait");
var rigger = require("gulp-rigger");
var flatten = require('gulp-flatten');
var del = require("del");

/* Создаем css */
gulp.task("style:build", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(wait(500))
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

// Собираем все компоненты в один
gulp.task("html:build", function () {
  return gulp.src("source/*.html")
    .pipe(rigger())
    .pipe(gulp.dest("build/"))
    .pipe(server.stream());
});

gulp.task("js:build", function () {
  gulp.src("source/js/main.js") //Найдем наш main файл
    .pipe(rigger())             //Прогоним через rigger
    .pipe(uglify())             //Сожмем наш js
    .pipe(gulp.dest("build/js")) //Выплюнем готовый файл в build
    .pipe(server.stream()); //И перезагрузим сервер
});

// временно
gulp.task("js:build:vendor", function () {
  gulp.src("source/js/assets/vendor/*.js") 
    .pipe(gulp.dest("build/js")) 
    .pipe(server.stream());
});

gulp.task("images:build", function() {
  return gulp.src("source/blocks/**/*.{png,jpg,gif,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}), /* 1 - максимальное сжатие, 3 - безопасное сжатие, 10 - без сжатия*/
      imagemin.jpegtran({progressive: true}),
      ]))
    .pipe(flatten())
    .pipe(gulp.dest("build/img"))
    .pipe(server.stream());
});

gulp.task("images:favicon", function () {
  return gulp.src("source/favicon/**/*.{png,jpg,gif,ico}")
    .pipe(gulp.dest("build/favicon"))
    .pipe(server.stream());
});


// gulp.task("svg:copy", function () {
//   return gulp.src("source/**/*.svg", {
//     base: "source"
//   })
//   .pipe(gulp.dest("build/img"))
//   .pipe(server.stream());
// });

gulp.task("fonts:build", function () {
  return gulp.src("source/fonts/**/*.*")
    .pipe(gulp.dest("build/fonts/"));
});

// gulp.task("sprites", function() {
//   return gulp.src("source/img/icons/*.svg")
//     .pipe(svgmin())
//     .pipe(svgstore({
//       inlineSvg: true
//     }))
//     .pipe(rename("sprite.svg"))
//     .pipe(gulp.dest("build/img"));
// });

gulp.task("serve", function () {
  server.init({
    server: "build/",
    notify: false,
    cors: true,
    ui: false
  });
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("watch", function () {
  watch(["source/**/*.html"], function (event, cb) {
    gulp.start("html:build");
  });
  watch(["source/**/*.scss"], function (event, cb) {
    gulp.start("style:build");
  });
  watch(["source/js/**/*.js"], function (event, cb) {
    gulp.start("js:build");
  });
  watch(["source/**/*.*"], function (event, cb) {
    gulp.start("images:build");
  });
  watch(["source/fonts/**/*.*"], function (event, cb) {
    gulp.start('fonts:build');
  });
});

gulp.task("default", ["build", "serve", "watch"]);

gulp.task("build", function (done) {
  run(
    "clean",
    "html:build",
    "js:build",
    "js:build:vendor",
    "style:build",
    "fonts:build",
    "images:build",
    "images:favicon",
    done
  );
});

// gulp.task('build', [
//   'html:build',
//   'js:build',
//   "js:build:vendor",
//   'style:build',
//   'fonts:build',
//   'images:build'
// ]);
