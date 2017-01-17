var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var gulpangulartemplatecache = require('gulp-angular-templatecache');

var format = require('util').format;
var merge = require('utils-merge');

var config = {
    mock: true,
    tenantName: 'svcc',
    destinationDir: './dist/',
    templateCache: {
        file: 'templates.js',
        options: {
            module: 'MTApp',
            standAlone: false,
            root: '/templates/'
        }
    }
};

// Gulp task for creating template cache
gulp.task('templatecache', function () {
    var templateDir = format('./%s/src/**/*.html', config.tenantName);
    gutil.log('Creating an AngularJS $templateCache ' + templateDir + ' -> ' + config.destinationDir);
    return gulp
        .src(templateDir)
        .pipe(gulpangulartemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.destinationDir));
});

gulp.task('scripts', function () {
    return bundle(browserify('./svcc/main.js'));
});

gulp.task('watch', function () {
    var baseDir = format('./%s', config.tenantName);
    var combinedArgs = merge(watchify.args, {debug: true});
    var b = browserify(baseDir, combinedArgs);
    if (config.mock == true){
        gutil.log('adding ' + format('%s/mock', config.tenantName));
        b.add(format('$s/mock', config.tenantName));
    }
    var watcher = watchify(b);

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


