var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task('scripts', function () {
    return bundle(browserify('./svcc/main.js'));
});

gulp.task('watch', function () {
    var watcher = watchify(browserify('./svcc/main.js', watchify.args));
    bundle(watcher);
    watcher.on('update', function () {
        bundle(watcher);
    });
    watcher.on('update', gutil.log);

    browserSync.init({
        server: "./dist"
    });
});

gulp.task('default', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

function bundle (bundler) {
    return bundler.bundle()
        .on('error', function (e) {
            gutil.log(e);
        })
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
}

gulp.task('secondlog', function () {
    gutil.log('this is second log entry');
});


