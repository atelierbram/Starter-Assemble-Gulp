// var Handlebars = require('handlebars');
// var helpers = require('handlebars-helpers');
var assemble = require('assemble');

// var options = {};
// var params = {
//   grunt: {},
//   assemble: assemble
// };
// helpers.register(Handlebars, options, params);
//
var extname = require('gulp-extname');

assemble.option('layout', 'base');

// https://gist.github.com/jonschlinkert/e2da295ec7ca5d159914

assemble.partials('src/templates/partials/*.hbs');
assemble.layouts('src/templates/layouts/*.hbs');
assemble.data(['src/data/*.{json,yml}']);

assemble.partials('src/templates/partials/*.hbs');
assemble.layouts('src/templates/layouts/*.hbs');
assemble.data(['src/data/*.{json,yml}']);

// https://github.com/assemble/gulp-assemble/blob/master/gulpfile.js
assemble.task('default', function () {
  assemble.src('src/content/**/*.hbs', { layout: 'base' })
    .pipe(extname())
    .pipe(assemble.dest('dist/static/'));
});
