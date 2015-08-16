var gulp  = require("gulp"),
	minHTML  = require("gulp-minify-html"),
	minCSS   = require("gulp-minify-css"),
	uglify   = require("gulp-uglify"),
	ts       = require("gulp-typescript"),
	image    = require("gulp-imagemin"),
	replace = require("gulp-html-replace"),
	concat   = require("gulp-concat");
	
gulp.task("build", function() {
	gulp.src("www/index.html")
		.pipe(replace({}))
		.pipe(minHTML())
		.pipe(gulp.dest("platforms/web/public/"));

	gulp.src("www/js/**.ts")
		.pipe(ts())
		.pipe(concat("index.js"))
		.pipe(uglify({ mangle: false }))
		.pipe(gulp.dest("platforms/web/public/js/"));

	gulp.src("www/css/**.css")
		.pipe(minCSS())
		.pipe(gulp.dest("platforms/web/public/css/"));

	gulp.src("www/img/**/**")
		.pipe(image({multipass: true}))
		.pipe(gulp.dest("platforms/web/public/img/"));

});

gulp.task("default", ["build"], function () {
	gulp.watch("src/public/index.html", ["build"]);
	gulp.watch("src/public/js/**.js", ["build"]);
	gulp.watch("src/public/less/**.css", ["build"]);
});
