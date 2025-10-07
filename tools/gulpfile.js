/**
* @summary Gulp and Gulp Modules procedurements for Aditivo Interactive Group S.A workflow.
**
* @author Mariano Makedonsky
*
* @since  1.0.0
*
* @see {@link http://www.aditivointeractivegroup.com}
**/

const { series } = require('gulp');

var gulp = require('gulp');

var sass = require('gulp-sass');

var header = require('gulp-header');

var cleanCSS = require('gulp-clean-css');

var concat = require('gulp-concat');

var rename = require("gulp-rename");

var sourcemaps = require('gulp-sourcemaps');

var del = require('del');

var babel = require('gulp-babel');

var terser = require('gulp-terser');

var cache = require('gulp-cache');

var pkg = require('./package.json');

var browserSync = require('browser-sync').create();

//var projectUrl = "http://mucba-moda.dev/";
var projectUrl = "http://mucba-sites-moda.dev/";

const merge2 = require('merge2');

const extReplace = require("gulp-ext-replace");

const imagemin = require('gulp-imagemin');

const imageminWebp = require('imagemin-webp');

var banner = [

  '/**',' * <%= pkg.name %> - <%= pkg.description %>',

  ' * @version v<%= pkg.version %>',

  ' * @link <%= pkg.homepage %>',

  ' * @license <%= pkg.license %>', ' */',''].join('\n');

const paths = {

  styles: {src: '../src/scss/**/*.scss', dest: '../dist/private/css/' },

  scripts: { src: '../src/js/**/*.js', dest: '../dist/private/js/' },

  html: {src:'../dist/*.html'},

  php: {src:"../dist/*.php"},

  images: {src:"../src/images/**/*", dest:'../dist/images/assets'},

  webp: {src:"../dist/images/assets/**/*", dest:'../dist/images/webp'}

};

var scriptsBundle = 'scripts.min.js';

var mainBundle = 'main.min.js';

/**
* @method vendors(done);
*
* @description
*
* Move all the files from node_modules to src folder.
* Then from there we concat js files and use css or scss file for
* the bundle css bundle.
*
* @param done callback.
*/

function vendors(){

  return merge2(

    gulp.src(['./node_modules/bootstrap/**/*']).pipe(gulp.dest('../src/vendors/bootstrap')),

    gulp.src([ './node_modules/@fortawesome/**/*']).pipe(gulp.dest('../src/vendors')),

    gulp.src(['./node_modules/jquery/dist/*', '!./node_modules/jquery/dist/core.js']).pipe(gulp.dest('../src/vendors/jquery')),

    gulp.src(['./node_modules/gsap/**/*']).pipe(gulp.dest('../src/vendors/gsap')),

    gulp.src(['./node_modules/slick-carousel/slick/**/*']).pipe(gulp.dest('../src/vendors/slick')),

    gulp.src(['./node_modules/jquery-form/dist/*']).pipe(gulp.dest('../src/vendors/jquery-form')),

    gulp.src(['./node_modules/smooth-scrollbar/**/*']).pipe(gulp.dest('../src/vendors/smooth-scrollbar')),

    gulp.src(['./node_modules/browser-image-compression/**/*']).pipe(gulp.dest('../src/vendors/browser-image-compression')),

    gulp.src(['./node_modules/block-ui/*']).pipe(gulp.dest('../src/vendors/block-ui')),

    gulp.src(['./node_modules/imagesloaded/*']).pipe(gulp.dest('../src/vendors/imagesloaded')),

    gulp.src(['./node_modules/video.js/**/*']).pipe(gulp.dest('../src/vendors/videojs')))

  //return gulp;

}

/**
* @method styles();
*
* @description
*
* Create all the process for the styling.
* 1 - get all the scss files.
* 2 - compile the with sas.
* 3 - minify
* 4 - concat all the data in the file style.min.css.
* 5 - create the header for the file.
* 6 - move file to distribution folder.
* 7 - stram the browserSync so we can update the content.
*
* @return gulp.
*/

function styles() {

  return gulp.src(['../src/scss/**/*.scss'])

  .pipe(cache.clear())

  .pipe(sass().on('error', sass.logError))

  .pipe(cleanCSS())

  .pipe(concat('style.min.css'))

  .pipe(header(banner, { pkg : pkg } ))

 	.pipe(gulp.dest('../dist/private/css'))

  .pipe(browserSync.reload({stream: true}));

}

/**
* @method styles();
*
* @description
*
* Create all the process for the our development js files.
* 1 - get all the js files.
* 2 - transpile them.
* 3 - minify with terser
* 4 - concat all the data in the file main.min.js
* 5 - create the header for the file.
* 6 - move file to distribution folder.
* 7 - stram the browserSync so we can update the content.
*
* @return gulp.
*/

function scripts() {

	return gulp.src([

  '../src/js/aditivo/ProjectConfig.js',

  '../src/js/aditivo/LanguagesManager.js',

  '../src/js/aditivo/IddleManager.js',

  '../src/js/utils/ProjectUtils.js',

  '../src/js/utils/Helpers.js',

  '../src/js/aditivo/AudioManager.js',

  '../src/js/aditivo/VideoManager.js',

  '../src/js/tympanus/imagesloaded.pkgd.min.js',

  '../src/js/tympanus/revealer.js',

  '../src/js/main.js',

  '../src/js/tympanus/demo.js'
  ]

  )

  .pipe(sourcemaps.init({loadMaps: true}))

  .pipe(cache.clear())

  .pipe(babel())

  .pipe(terser())

  .pipe(concat(mainBundle))

  .pipe(header(banner, { pkg : pkg } ))

  .pipe(sourcemaps.write('../maps'))

  .pipe(gulp.dest(paths.scripts.dest))

  .pipe(browserSync.stream());
}


/**
* @method watch();
*
* @description - check for all the css and js changes. Then call reload method
**/

function watch() {

    cache.clearAll();

    browserSync.init({ proxy: { target: projectUrl } });

    gulp.watch(paths.styles.src, gulp.series(styles));

    gulp.watch(paths.scripts.src, gulp.series(scripts));

    gulp.watch(paths.php.src).on('change', browserSync.reload);

    gulp.watch(paths.html.src).on('change', browserSync.reload);

    //images();

}

/**
* @method compileVendors();
*
* @description
*
* Create a separate bundle for all the vendors scripts. We just compile this once on build.
* 1 - get all the js files.
* 2 - transpile them.
* 3 - minify with terser
* 4 - concat all the data in the file main.min.js
* 5 - create the header for the file.
* 6 - move file to distribution folder.
* 7 - stram the browserSync so we can update the content.
*
* @return gulp.
*/

function compileVendors(cb){

  gulp.src([

  '../src/vendors/jquery/jquery.min.js',

  '../src/vendors/slick/slick.min.js',

  '../src/vendors/bootstrap/dist/js/bootstrap.bundle.min.js',

  '../src/vendors/fontawesome-free/js/all.min.js',

  '../src/vendors/gsap/src/minified/TweenMax.min.js',

  '../src/vendors/videojs/dist/video.min.js',

  '../src/vendors/block-ui/jquery.blockUI.js'])

  .pipe(sourcemaps.init({loadMaps: true}))

  .pipe(babel())

  .pipe(terser())

  .pipe(concat(scriptsBundle))

  .pipe(header(banner, { pkg : pkg } ))

  .pipe(sourcemaps.write('../maps'))

  .pipe(gulp.dest(paths.scripts.dest));

  cb();

}

/**
* @method clean();
*
* @description - clean all the stuff in folder...
**/

function clean() {

  return del([ 'assets' ]);

}

/**
* @method minimizeImages();
* @description - minimize images from source to dist...
**/

function minimizeImages(cb){

  return gulp.src(paths.images.src)

  .pipe(imagemin([

    imagemin.gifsicle({interlaced: true}),

    imagemin.mozjpeg({quality: 75, progressive: true}),

    imagemin.optipng({optimizationLevel: 5}),

    imagemin.svgo({ plugins: [{removeViewBox: true}, {cleanupIDs: false} ] })

  ]))

  .pipe(gulp.dest(paths.images.dest))

  cb()

}

/**
* @method webp();
* @description - convert to minimized images to webp...
**/

function webp(cb){

  return gulp.src(paths.webp.src)

  .pipe(imagemin([ imageminWebp({ quality: 75 }) ]))

  .pipe(extReplace(".webp"))

  .pipe(gulp.dest(paths.webp.dest))

  cb()

}

//create the series and paralels

var build = gulp.series(clean, vendors, compileVendors, gulp.parallel(styles, scripts));

//build images

var images = gulp.series(minimizeImages, webp);

exports.clean = clean;

exports.styles = styles;

exports.scripts = scripts;

exports.watch = watch;

exports.build = build;

exports.images = images;

exports.default = build;

exports.vendors = vendors;

exports.compileVendors = compileVendors;

exports.minimizeImages = minimizeImages;

exports.webp = webp;
