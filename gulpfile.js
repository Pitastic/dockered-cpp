const gulp = require('gulp');
const babel = require('gulp-babel');



gulp.task('css', function() {
	return gulp.src('input/css/**/*.css')
	.pipe(gulp.dest('output/css/'));
});



gulp.task('js', function() {
	return gulp.src('input/js/**/*.js')
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
	.on('error', console.error.bind( console ))
	.pipe(gulp.dest('output/js/'))
});


gulp.task('default', ['css', 'js'], function(){
	//gulp.watch('input', ['js'])
});