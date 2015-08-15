var gulp = require("gulp"),
	minHTML = require("gulp-minify-html"),
	minCSS = require("gulp-minify-css"),
	uglify = require("gulp-uglify"),
	ts = require("gulp-typescript");
	
gulp.task("build", function() {
	gulp.src("src/public/index.html")
		.pipe(minHTML())
		.pipe(gulp.dest("dist/public/"));
		
	gulp.src("src/server.js")
		.pipe(uglify({ mangle: false }))
		.pipe(gulp.dest("dist/"));
		
	gulp.src("src/public/js/**.js")
		.pipe(uglify({ mangle: false }))
		.pipe(gulp.dest("dist/public/js/"));
		
	gulp.src("src/public/css/**.css")
		.pipe(minCSS())
		.pipe(gulp.dest("dist/public/css/"));
});

gulp.task("default", ["build"], function () {
	gulp.watch("src/public/index.html", ["build"]);
	gulp.watch("src/public/js/**.js", ["build"]);
	gulp.watch("src/public/less/**.css", ["build"]);
});