const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const uglify = require('gulp-uglify');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');

gulp.task('browserify', () => browserify({
    basedir: '.',
    debug: true,
    entries: ['src/index.ts'],
    cache: {},
    packageCache: {},
})
    .plugin(tsify)
    .bundle()
    .pipe(source('boardfy.js'))
    .pipe(gulp.dest('dist')));

gulp.task('manifest', function() {
    return gulp.src('./src/manifest.json')
        .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {
    return gulp.src('./styles/index.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('dist/styles'));
});
