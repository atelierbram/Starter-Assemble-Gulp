var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
// var minifycss = require('gulp-minify-css');
// http://www.sitepoint.com/simple-gulpy-workflow-sass/
// sassdoc for documenting your sass
// var sassdoc = require('sassdoc');

// npm install --save-dev gulp-gh-pages
// Usage: Define a deploy task in your gulpfile.js (as below) which can be used to push to gh-pages going forward.

var ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
  return gulp.src('dist/**/*')
    .pipe(ghPages());
});

// Now, you should be able to call your task by doing:
//
// gulp deploy
// API
//

// option Vars
var srcSass = 'src/assets/sass/**/*.scss';
var distCss = 'dist/assets/css';
var srcAssets = 'src/assets/';
var distAssets = 'dist/assets/';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};
// https://github.com/ai/browserslist#queries
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 1%', 'Firefox ESR', 'ie >= 9']
};
var sassdocOptions = {
 dest: 'dist/sassdoc'
};
//
//gulp.task('sassdoc', function () {
//  return gulp
//    .src(srcSass)
//    .pipe(sassdoc(sassdocOptions))
//    .resume();
//});

// minify html
gulp.task('minify', function() {
  return gulp.src('dist/static/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('copy-js', function() {
  gulp.src('src/assets/js/*.js')
  .pipe(gulp.dest('dist/assets/js/'));
});

// tasks
gulp.task('sass', function () {
  return gulp
    // Find all `.scss` file from the `assets/sass` folder
    .src(srcSass)
    // .pipe(sourcemaps.init())
    // Run Sass on those files
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(autoprefixer())
    // write the resulting CSS in the dist-output folder for distribution
    .pipe(gulp.dest(distCss));
    // .pipe(sassdoc())
    // Release the pressure back and trigger flowing mode (drain)
    // See: http://sassdoc.com/gulp/#drain-event
    // .resume();
});

gulp.task('watch', function() {
  return gulp
    // Watch the Sass src folder for change,
    // and run `sass` task when something happens
    .watch(srcSass, ['sass'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});


gulp.task('default', ['sass', 'watch']);

