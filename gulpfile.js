/*
========= Modules
*/
var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var babelify = require('babelify');
var vsource = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var vbuffer = require('vinyl-buffer');


/*
========= Settings
*/
var jsFolder = 'input/js/';
var cssFolder = 'input/css/';

// set this to an array of your files or use AUTO_MODE for an automated list of all inputfiles
var jsFiles = AUTO_MODE
var cssFiles = AUTO_MODE


/*
 ========= Tasks
*/
gulp.task('css-standard', function() {
	return gulp.src(cssFiles)
	.pipe( uglify() )
	.pipe(gulp.dest('output/css/'));
});


gulp.task('js-pitastic', function() {
	return gulp.src(jsFiles[0])
	.pipe(babel({
		minified: true,
		comments: false,
		presets: [
			[ "@babel/preset-env", {
				targets: {
					"chrome" : "45",
					"firefox" : "45",
					"safari" : "9.1.3"
				}
			}]
		]
	}))
	.pipe( gulp.dest('output/js/') )
});


gulp.task('js-ac', function() {
	jsFiles.map(function( entry ){
		// 1. browserify
		return browserify({
			entries: [jsFolder + entry]
		})
		// 2. transform with babel
		.transform( babelify, { presets: ["@babel/preset-env"] } )
		// 3. bundle
		.bundle()
		// 4. source
		.pipe( vsource ( entry ) )
		// 5. rename
		// TODO
		// 6. buffer
		.pipe( vbuffer () )
		// 7. init sourcemap
		.pipe( sourcemaps.init( { loadMaps: true } ) )
		// 8. minify with uglify
		.pipe( uglify() )
		// 9. sourcemaps
		.pipe( sourcemaps.write('./') )
		// 10. write to disk
		.pipe( gulp.dest('output/js/') )
	})
});


gulp.task('default', ['css-standard', 'js-pitastic'], function(){
	//gulp.watch('input', ['js'])
});
