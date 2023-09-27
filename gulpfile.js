const { src, dest, parallel, series, watch } = require('gulp') 
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image')
const babel = require('gulp-babel')
const notify = require('gulp-notify')
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const autoPrefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()

const clean = () => {
    return del(['dist'])
}

const cleanDev = () => {
    return del(['dev'])
}

const resources = () => {
    return src('src/**')
    .pipe(dest('dist'))
}

const resourcesDev = () => {
    return src('src/**')
    .pipe(dest('dev'))
}

const styles = () => {
    return src('src/styles/**/*.css')
    .pipe(concat('main.css'))
    .pipe(autoPrefixer({
        cascade: false,
        overrideBrowserslist: ['last 10 versions'],
        grid: true
    }))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const stylesDev = () => {
    return src('src/styles/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(dest('dev'))
}

function buildStyles() {
    return src('src/styles/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css'));
  };

const htmlMinify = () => {
    return src('src/**/*.html')
    .pipe(htmlMin({
        collapseWhitespace: true,
    }))
.pipe(dest('dist'))
.pipe(browserSync.stream())
}

const htmlDev = () => {
    return src('src/**/*.html')
    .pipe(dest('dev'))
}

const svgSprites = () => {
    return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: '../sprite.svg'
            }
        }
    }))
    .pipe(dest('dist/images'))
}

const scripts = () => {
    return src([
        'src/js/**/*.js',
        'src/js/main.js'
    ])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify().on('error', notify.onError()))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const scriptsDev = () => {
    return src([
        'src/js/**/*.js',
        'src/js/main.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(dest('dev'))
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dev',
            notify: false
        }
    })
}

const images = () => {
    return src([
        'src/images/**/*.jpg',
        'src/images/**/*.png',
        'src/images/*.svg',
        'src/images/**/*.jpeg',
    ])
    .pipe(image())
    .pipe(dest('dist/images'))
    .pipe(dest('dev/images'))
}

function build() {
    return src('dist')
}

watch('src/**/*.html', htmlMinify)
watch('src/styles/**/*.css', styles) 
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resourcses/**', resources)
watch('src/styles/**/*.scss', buildStyles);

exports.clean = clean
exports.cleanDev = cleanDev
exports.stylesDev = stylesDev
exports.styles = styles
exports.buildStyles = buildStyles
exports.scripts = scripts
exports.scriptsDev = scriptsDev
exports.htmlMinify = htmlMinify
exports.htmlDev = htmlDev
exports.build = series(clean, resources, htmlMinify, scripts, styles, buildStyles, images, svgSprites, build)
exports.default = parallel(htmlDev, resourcesDev, stylesDev, scriptsDev, watchFiles)


