var gulp = require('gulp'),
    template = require('gulp-template'),
    ts = require('gulp-typescript'),
    sass = require('gulp-ruby-sass'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    webpack = require('webpack-stream'),
    WebpackDevServer = require('webpack-dev-server');

var buildType = 'BUILD_DEV'; // Types: BUILD_DEV, BUILD_PROD

/* -- Webpack -- */
gulp.task('webpack', ['webpack:dev']);

gulp.task('webpack:dev', function() {
    return gulp.src('./app/main.ts')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dev/scripts'));
});

gulp.task('webpack:prod', function() {
    return gulp.src('./app/main.ts')
        .pipe(webpack(require('./webpack-prod.config.js')))
        .pipe(gulp.dest('dist/scripts'));
});

/* -- Typescript -- */
// Currently unused because of webpack ts transpilation
var tsProject = ts.createProject('./tsconfig.json');

gulp.task('ts', ['ts:dev']);

gulp.task('ts:dev', function() {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest("dev/scripts"));
});

gulp.task('ts:prod', function() {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest("dist/scripts"));
});

/* -- Sass -- */
gulp.task('sass', ['sass:dev']);

gulp.task('sass:dev', function() {
    return sass('./scss/styles.scss', {sourcemap: true})
        .on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dev/css'));
});

gulp.task('sass:prod', function() {
    return sass('./scss/styles.scss', {sourcemap: true})
        .on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});

/* -- HTML -- */
gulp.task('html', ['html:dev']);

gulp.task('html:dev', function() {
    return gulp.src('./index.template.html')
        .pipe(template({isProd: false}))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('.'));
});

gulp.task('html:prod', function() {
    return gulp.src('./index.template.html')
        .pipe(template({isProd: true}))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('.'));
});

/* -- Watcher -- */
gulp.task('watch', function() {
    gulp.watch('./app/**/*.ts', ['webpack', 'html']);
    gulp.watch('./scss/**/*.scss', ['sass', 'html']);
    gulp.watch('./index.template.html', ['html']);
});

/* -- Builders -- */
gulp.task('dev', ['webpack:dev', 'sass:dev', 'html:dev']);

gulp.task('prod', ['webpack:prod', 'sass:prod', 'html:prod']);

gulp.task('default', ['dev']);