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
var jsFiles = [ 'export.js', 'crypto-js-v3.1.2/components/enc-utf16-min.js', 'crypto-js-v3.1.2/components/x64-core-min.js', 'crypto-js-v3.1.2/components/pad-ansix923.js', 'crypto-js-v3.1.2/components/pad-nopadding-min.js', 'crypto-js-v3.1.2/components/hmac.js', 'crypto-js-v3.1.2/components/mode-ecb.js', 'crypto-js-v3.1.2/components/sha1-min.js', 'crypto-js-v3.1.2/components/enc-base64-min.js', 'crypto-js-v3.1.2/components/mode-ctr-gladman-min.js', 'crypto-js-v3.1.2/components/mode-cfb.js', 'crypto-js-v3.1.2/components/aes-min.js', 'crypto-js-v3.1.2/components/mode-ofb.js', 'crypto-js-v3.1.2/components/sha384.js', 'crypto-js-v3.1.2/components/rabbit.js', 'crypto-js-v3.1.2/components/ripemd160.js', 'crypto-js-v3.1.2/components/lib-typedarrays.js', 'crypto-js-v3.1.2/components/x64-core.js', 'crypto-js-v3.1.2/components/mode-ctr.js', 'crypto-js-v3.1.2/components/aes.js', 'crypto-js-v3.1.2/components/md5.js', 'crypto-js-v3.1.2/components/sha512.js', 'crypto-js-v3.1.2/components/core.js', 'crypto-js-v3.1.2/components/mode-cfb-min.js', 'crypto-js-v3.1.2/components/core-min.js', 'crypto-js-v3.1.2/components/sha224.js', 'crypto-js-v3.1.2/components/evpkdf.js', 'crypto-js-v3.1.2/components/pbkdf2.js', 'crypto-js-v3.1.2/components/rabbit-min.js', 'crypto-js-v3.1.2/components/ripemd160-min.js', 'crypto-js-v3.1.2/components/rabbit-legacy-min.js', 'crypto-js-v3.1.2/components/pad-iso10126.js', 'crypto-js-v3.1.2/components/sha384-min.js', 'crypto-js-v3.1.2/components/sha3-min.js', 'crypto-js-v3.1.2/components/evpkdf-min.js', 'crypto-js-v3.1.2/components/tripledes.js', 'crypto-js-v3.1.2/components/sha512-min.js', 'crypto-js-v3.1.2/components/mode-ctr-min.js', 'crypto-js-v3.1.2/components/rc4-min.js', 'crypto-js-v3.1.2/components/cipher-core-min.js', 'crypto-js-v3.1.2/components/pbkdf2-min.js', 'crypto-js-v3.1.2/components/enc-base64.js', 'crypto-js-v3.1.2/components/pad-iso97971.js', 'crypto-js-v3.1.2/components/rc4.js', 'crypto-js-v3.1.2/components/cipher-core.js', 'crypto-js-v3.1.2/components/sha1.js', 'crypto-js-v3.1.2/components/mode-ofb-min.js', 'crypto-js-v3.1.2/components/enc-utf16.js', 'crypto-js-v3.1.2/components/mode-ecb-min.js', 'crypto-js-v3.1.2/components/md5-min.js', 'crypto-js-v3.1.2/components/format-hex.js', 'crypto-js-v3.1.2/components/sha256-min.js', 'crypto-js-v3.1.2/components/lib-typedarrays-min.js', 'crypto-js-v3.1.2/components/sha256.js', 'crypto-js-v3.1.2/components/rabbit-legacy.js', 'crypto-js-v3.1.2/components/pad-zeropadding.js', 'crypto-js-v3.1.2/components/format-hex-min.js', 'crypto-js-v3.1.2/components/pad-ansix923-min.js', 'crypto-js-v3.1.2/components/pad-zeropadding-min.js', 'crypto-js-v3.1.2/components/pad-iso10126-min.js', 'crypto-js-v3.1.2/components/mode-ctr-gladman.js', 'crypto-js-v3.1.2/components/sha224-min.js', 'crypto-js-v3.1.2/components/sha3.js', 'crypto-js-v3.1.2/components/hmac-min.js', 'crypto-js-v3.1.2/components/pad-iso97971-min.js', 'crypto-js-v3.1.2/components/pad-nopadding.js', 'crypto-js-v3.1.2/components/tripledes-min.js', 'crypto-js-v3.1.2/rollups/sha384.js', 'crypto-js-v3.1.2/rollups/hmac-sha384.js', 'crypto-js-v3.1.2/rollups/rabbit.js', 'crypto-js-v3.1.2/rollups/hmac-sha224.js', 'crypto-js-v3.1.2/rollups/ripemd160.js', 'crypto-js-v3.1.2/rollups/aes.js', 'crypto-js-v3.1.2/rollups/md5.js', 'crypto-js-v3.1.2/rollups/sha512.js', 'crypto-js-v3.1.2/rollups/hmac-ripemd160.js', 'crypto-js-v3.1.2/rollups/sha224.js', 'crypto-js-v3.1.2/rollups/hmac-sha1.js', 'crypto-js-v3.1.2/rollups/pbkdf2.js', 'crypto-js-v3.1.2/rollups/tripledes.js', 'crypto-js-v3.1.2/rollups/hmac-sha512.js', 'crypto-js-v3.1.2/rollups/rc4.js', 'crypto-js-v3.1.2/rollups/sha1.js', 'crypto-js-v3.1.2/rollups/hmac-sha256.js', 'crypto-js-v3.1.2/rollups/hmac-md5.js', 'crypto-js-v3.1.2/rollups/sha256.js', 'crypto-js-v3.1.2/rollups/rabbit-legacy.js', 'crypto-js-v3.1.2/rollups/sha3.js', 'crypto-js-v3.1.2/rollups/hmac-sha3.js', 'frameworks/jquery-3.3.1.min.js', 'frameworks/babel.min.js', 'frameworks/indexeddbshim.min.js', 'frameworks/babel_polyfill.min.js', 'settings.js', 'details_students.js', 'stay.js', 'identify.js', 'index.js', 'touch.js', 'sync.js', 'all.js', 'database.js', 'jsflot/jquery.flot.stack.min.js', 'jsflot/jquery.flot.symbol.js', 'jsflot/jquery.flot.navigate.js', 'jsflot/jquery.flot.resize.js', 'jsflot/jquery.flot.js', 'jsflot/jquery.flot.min.js', 'jsflot/jquery.flot.selection.min.js', 'jsflot/jquery.flot.symbol.min.js', 'jsflot/jquery.flot.canvas.js', 'jsflot/jquery.flot.image.min.js', 'jsflot/excanvas.min.js', 'jsflot/jquery.flot.threshold.min.js', 'jsflot/jquery.flot.pie.min.js', 'jsflot/jquery.flot.crosshair.js', 'jsflot/jquery.flot.threshold.js', 'jsflot/jquery.flot.fillbetween.min.js', 'jsflot/jquery.flot.image.js', 'jsflot/jquery.flot.navigate.min.js', 'jsflot/jquery.flot.canvas.min.js', 'jsflot/jquery.flot.valuelabels.js', 'jsflot/jquery.colorhelpers.min.js', 'jsflot/jquery.flot.categories.min.js', 'jsflot/jquery.flot.selection.js', 'jsflot/jquery.flot.stack.js', 'jsflot/jquery.flot.pie.js', 'jsflot/jquery.flot.crosshair.min.js', 'jsflot/jquery.flot.time.js', 'jsflot/jquery.flot.errorbars.min.js', 'jsflot/jquery.colorhelpers.js', 'jsflot/jquery.flot.fillbetween.js', 'jsflot/jquery.flot.resize.min.js', 'jsflot/excanvas.js', 'jsflot/jquery.flot.errorbars.js', 'jsflot/jquery.flot.time.min.js', 'jsflot/jquery.flot.categories.js', 'uebersicht.js', 'details_leistungen.js', ]
var cssFiles = [ ]


/*
 ========= Tasks
*/
gulp.task('css-standard', function() {
	return gulp.src(cssFiles)
	.pipe( uglify() )
	.pipe(gulp.dest('output/css/'));
});


gulp.task('js-pitastic', function() {
	return gulp.src([jsFolder+"**/*.js", '!'+jsFolder+'**/*.min.js', '!'+jsFolder+'**/*-min.js'])
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


gulp.task('js-move-mins', function() {
	return gulp.src([jsFolder+'**/*.min.js', jsFolder+'**/*-min.js'])
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


gulp.task('default', ['css-standard', 'js-pitastic', 'js-move-mins'], function(){
	//gulp.watch('input', ['js'])
});
