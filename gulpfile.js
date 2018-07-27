var gulp 				= require('gulp');
var browserSync = require('browser-sync').create();
var sass 				= require('gulp-sass');
var rename      = require('gulp-rename');
var cssmin      = require('gulp-cssnano');
var prefix      = require('gulp-autoprefixer');
var plumber     = require('gulp-plumber');
var sourcemaps  = require('gulp-sourcemaps');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
	return gulp.src(['scss/*.scss'])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(prefix())
		.pipe(rename('style.css'))
		.pipe(gulp.dest("css"))
		.pipe(cssmin())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest("css"))
		.pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function () {
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/ekko-lightbox/dist/ekko-lightbox.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
		.pipe(gulp.dest("js"))
		.pipe(browserSync.stream());
});

// Move fonts
gulp.task('fonts', function() {
  return gulp.src('node_modules/open-iconic/font/fonts/*')
    .pipe(gulp.dest('./fonts'))
})

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

	browserSync.init({
		server: "./"
	});

	gulp.watch(['scss/*.scss'], ['sass']);
	gulp.watch("./**/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js', 'serve']);