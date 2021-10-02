"use strict";

const FRONT_PATH = "/src/";
const BUILD_PATH = "/build";

const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const gutil = require("gulp-util");
const babel = require("gulp-babel");
const babelify = require("babelify");

const imagemin = require("gulp-imagemin");
const imageminJpegoptim = require("imagemin-jpegoptim");
const imageminJpegRecompress = require("imagemin-jpeg-recompress");
const imageminWebp = require("imagemin-webp");
const imageResize = require('gulp-image-resize');

const rename = require("gulp-rename");
const browserSync = require("browser-sync");
const fileInclude = require("gulp-file-include");
const gulpClone = require("gulp-clone");
const clonesink = gulpClone.sink();
const mkdirp = require("mkdirp");
const fs = require("fs");
const getDirName = require("path").dirname;
const plumber = require('gulp-plumber');


function img(cb) {
  return (
    gulp
      .src("." + FRONT_PATH + "**/*.{jpg,png,jpeg}")
      .pipe(plumber())
      .pipe(imageResize({
        width : 1280
      }))
      .pipe(
        imagemin(
          [
            imagemin.gifsicle(),
            imagemin.optipng({
              optimizationLevel: 7,
            }),
            imagemin.svgo(),
            imageminJpegRecompress({
              accurate: true,
            }),
          ],
          {
            verbose: true,
          }
        )
      )
      // временный путь для iq
      .pipe(gulp.dest("." + BUILD_PATH))
  );
}


// КОМАНДЫ ЗАПУСКА

exports.img = gulp.series(gulp.parallel(img));