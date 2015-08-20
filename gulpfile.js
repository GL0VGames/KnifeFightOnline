var gulp  = require("gulp"),
	minHTML  = require("gulp-minify-html"),
	minCSS   = require("gulp-minify-css"),
	uglify   = require("gulp-uglify"),
	ts       = require("gulp-typescript"),
	image    = require("gulp-imagemin"),
	replace = require("gulp-html-replace"),
	concat   = require("gulp-concat"),
	rsync = require("gulp-rsync");
	
gulp.task("build", function() {
	gulp.src("www/index.html")
		.pipe(replace({
		libs: "<script src=\"js/libs.js\"></script>",
		js: "<script src=\"js/index.js\"></script>"
	}))
		.pipe(minHTML())
		.pipe(gulp.dest("platforms/web/public/"));

	gulp.src("www/js/**.js")
//		.pipe(ts())
//		.pipe(uglify({ mangle: false }))
		.pipe(concat("index.js"))
		.pipe(gulp.dest("platforms/web/public/js/"));

	gulp.src("www/js/libs/**/**.js")
//		.pipe(ts())
		.pipe(concat("libs.js"))
		.pipe(uglify({ mangle: false }))
		.pipe(gulp.dest("platforms/web/public/js/"))

	gulp.src("www/css/**.css")
		.pipe(minCSS())
		.pipe(gulp.dest("platforms/web/public/css/"));

	gulp.src("www/img/**/**")
		.pipe(image({multipass: true}))
		.pipe(gulp.dest("platforms/web/public/img/"));

});

gulp.task("deploy", function() {
	gulp.src("platforms/web/**")
		.pipe(rsync({
			root: "platforms/web",
			hostname: "gl0vgames.com",
			destination: "/usr/share/nginx/kfo/",
			username: "root",
			incremental: true,
			progress: true,
			recursive: true
	}));
	console.log("Change permissions on new files (644) and directories (755)!")
})

gulp.task("default", ["build"], function () {
	gulp.watch("www/index.html", ["build"]);
	gulp.watch("www/js/**.js", ["build"]);
	gulp.watch("www/css/css/**.css", ["build"]);
});
