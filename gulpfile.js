const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const uglify = require('gulp-uglify');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');

function runScripts() {
    return browserify({
            basedir: '.',
            debug: true,
            entries: ['src/index.ts'],
            cache: {},
            packageCache: {},
        })
        .plugin(tsify)
        .bundle()
        .pipe(source('boardfy.js'))
        .pipe(gulp.dest('dist'));
}

gulp.task('browserify', runScripts);

function runManifest() {
    return gulp.src('./src/manifest.json')
        .pipe(gulp.dest('./dist'));
}

gulp.task('manifest', runManifest);

function runStyles() {
    return gulp.src('./styles/index.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('dist/styles'));
}

gulp.task('styles', runStyles);

gulp.task('extension', gulp.series('browserify', 'manifest', 'styles'));

gulp.task('watchScript', function() {
    gulp.watch('./src/**/*.ts', function(){
        return runScripts();
    });
});

gulp.task('watchManifest', function() {
    gulp.watch('./src/manifest.json', function(){
        return runManifest();
    });
});

gulp.task('watchStyles', function() {
    gulp.watch('./styles/**/*.scss', function(){
        return runStyles();
    });
});

gulp.task('watch', gulp.parallel('watchScript', 'watchManifest', 'watchStyles'));
