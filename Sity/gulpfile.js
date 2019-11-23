"use strict"

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");

gulp.task("css", function () {
    return gulp.src("src/sass/style.sass")
      .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(sass())
      .pipe(postcss([
        autoprefixer()
      ]))
      .pipe(csso())
      .pipe(rename("style.min.css"))
      .pipe(sourcemap.write("."))
      .pipe(gulp.dest("src/css"))
      .pipe(server.stream());
  });

  gulp.task("server", function () {
    server.init({
      server: "src/",
      notify: false,
      open: true,
      cors: true,
      ui: false
    });
  
    gulp.watch("src/sass/**/*.sass", gulp.series("css"));
    gulp.watch("src/index.html", gulp.series("refresh"));
  });

  gulp.task("images", function() {
    return gulp.src("src/assets/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("src/assets/img"));
  });

  gulp.task("webp", function() {
    return gulp.src("src/assets/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("src/assets/img"));
  });

  gulp.task("refresh", function(done) {
    server.reload();
    done();
  })

  gulp.task("start", gulp.series("css", "server"));
