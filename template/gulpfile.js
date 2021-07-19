'use strict';

const gulp = require('gulp');
const del = require('del');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

const imagemin = require('gulp-imagemin');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const objectFit = require('postcss-object-fit-images')
const minify = require('gulp-csso');

const uglify = require('gulp-uglify');

const server = require('browser-sync').create();

gulp.task('clean', function() {
  return del('build');
});

gulp.task('copy', function() {
  return gulp.src([
      'src/fonts/**/*.{woff,woff2}',
      'src/img/*.webp',
      'src/js/*'
    ], {
      base: 'src'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('images', function () {
  return gulp.src([
      'src/img/**/*.{png,jpg,svg}',
      '!src/img/sprite/*.svg'
    ])
    .pipe(newer('build/img'))
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      })
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('sprite', function() {
  return gulp.src('src/img/sprite/*.svg')
    .pipe(svgmin({
      plugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(svgstore({
      inlineSvg: true,
      removeAttrs: {attrs: '(stroke|fill)'}
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('style', function () {
  return gulp.src('src/sass/style.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss([
      autoprefixer(),
      objectFit()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('scripts', function() {
  return gulp.src([
    'src/js/*.js'
   ])
  .pipe(plumber())
  .pipe(concat('script.js'))
  .pipe(gulp.dest('build/js'))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('build/js'));
});

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(gulp.dest('build'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'images',
  'sprite',
  'style',
  'scripts',
  'html'
));

gulp.task('serve', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false,
    port: 9999,
  });

  gulp.watch('src/img/**/*', gulp.series('images', 'refresh'));
  gulp.watch('src/img/sprite/*.svg', gulp.series('sprite', 'refresh'));
  gulp.watch('src/sass/**/*.scss', gulp.series('style'));
  gulp.watch('src/js/**/*.js', gulp.series('scripts', 'refresh'));
  gulp.watch('src/**/*.html', gulp.series('html', 'refresh'));
});

gulp.task('start', gulp.series('build', 'serve'));
