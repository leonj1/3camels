var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    prefix = require('gulp-autoprefixer'),
    concatCss = require('gulp-concat-css'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    htmlbuild = require('gulp-htmlbuild'),
    clean = require('gulp-clean'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    postcssFontGrabber = require('postcss-font-grabber'),
    postcssSingleCharset = require("postcss-single-charset"),
    postcssDiscardDuplicates = require('postcss-discard-duplicates'),
    cssMqpacker = require("css-mqpacker"),
    cssnano = require('gulp-cssnano'),
    precss = require('precss'),
    addsrc = require('gulp-add-src'),
    rev = require('gulp-rev'),
    inject = require('gulp-inject'),
    preprocess = require('gulp-preprocess'),
    rename = require("gulp-rename"),
    argv = require('yargs').argv,
    replace = require('gulp-replace');

// Path settings for Gulp
var clientApp = './src/',
    buildDest = './build/';

var config = {
    html: {
        templates: [
            clientApp + '**/*.html',
            clientApp + '/*.html'
            ]
    },
    appCss: {
        source: 'css/app/app.css',
        dest: 'app.min.css'
    },
    appScss: {
        source: ['css/app/*.scss']
    },
    vendorCss: {
        source: [
            'node_modules/angular-moment-picker/dist/angular-moment-picker.min.css',
            'bower_components/angular-fancy-modal/dist/angular-fancy-modal.min.css',
            'node_modules/angular-loading-bar/build/loading-bar.min.css',
            'node_modules/normalize.css/normalize.css',
            'css/vendor/font-awesome.min.css',
            'css/vendor/skeleton.css'
            ],
        dest: 'vendor.min.css'
    },
    scripts: {
        source: [
            'node_modules/angular/angular.js',
            'js/vendor/jquery/jquery.min.js',
            'js/vendor/angular-ui-router/release/angular-ui-router.min.js',
            'node_modules/moment/min/moment-with-locales.min.js',
            'bower_components/humanize-duration/humanize-duration.js',
            'node_modules/angular-moment-picker/dist/angular-moment-picker.min.js',
            'bower_components/angular-fancy-modal/dist/angular-fancy-modal.min.js',
            'node_modules/angular-loading-bar/build/loading-bar.min.js',
            'bower_components/angular-timer/dist/angular-timer.min.js',
            'node_modules/angular-jwt/dist/angular-jwt.min.js',
            'node_modules/underscore/underscore-min.js',
            'js/vendor/angular-fontawesome.min.js',
            'libs/ngStorage.min.js',
            'js/app/startup.js',
            'js/app/**/*.js',
            clientApp + '/**/*.js'
        ],
        dest: buildDest + '/js/'
    },
    img: {
        source: clientApp + 'img/**/*.png',
        dest: buildDest + 'img'
    },
    fonts: {
        source: 'fonts/**/*.*',
        dest: buildDest + 'css/fonts'
    },
    templateCache: {
        file: 'templates.js',
        options: {
            module: 'lottoApp',
            root: '/',
            standAlone: false
        }
    },
    temp: buildDest + '/js/',
    cssDist: buildDest + '/css/',
    imgDist: buildDest + '/img/',
    fontDist: buildDest + '/fonts/',
    jsUnCompressed: 'scripts.js',
    jsCompressed: 'scripts.min.js',
    singlePageApps: ['index.html'],
    site: {
        dev: {
            protocol: 'http://',
            api: 'local.lottocanary.com',
            port: '80'
        },
        prod: {
            protocol: 'https://',
            api: 'www.lottocanary.com',
            port: ''
        }
    }
};

gulp.task('default', gulp.series(cleanBuild, gulp.parallel(img, fonts, copyHtmlFiles, styles, stylesVendor, scriptsRev)));

gulp.task('watch', gulp.series('default', gulp.parallel(imgWatch, html1Watch, jsWatch, cssApp2Watch, cssVendorWatch)));

gulp.task('styles', styles);

gulp.task('stylesVendor', stylesVendor);

// task for verifying the JS gets generated OK
gulp.task('scripts', scriptsRev);

function munge() {
    gulp.src([config.temp + config.jsUnCompressed])
        .pipe(replace('%%PROTOCOL%%', site[argv.env].protocol))
        .pipe(replace('%%API%%', site[argv.env].api))
        .pipe(replace('%%PORT%%', site[argv.env].port))
        .pipe(gulp.dest(config.temp + config.jsUnCompressed));
}

// Task to concat JS and add version sha to scripts.js
function scriptsRev() {
    var target = gulp.src('./src/index.html'),
        _targetEnv = argv.env === undefined ? 'dev' : argv.env;
    console.log('munging with environment: ' + _targetEnv);
    var vendorStream = gulp.src(config.scripts.source)
        .pipe(concat(config.jsUnCompressed))
        .pipe(replace('%%PROTOCOL%%', config.site[_targetEnv].protocol))
        .pipe(replace('%%API%%', config.site[_targetEnv].api))
        .pipe(replace('%%PORT%%', config.site[_targetEnv].port))
        .pipe(rev())
        .pipe(gulp.dest(config.scripts.dest));

    return target.pipe(inject(vendorStream, {ignorePath: 'build'}))
        .pipe(gulp.dest(buildDest));
}

function jsWatch() {
    var watcher = gulp.watch('js/**/*.*');
    watcher.on('all', function (event, path, stats) {
        console.log('File ' + path + ' was ' + event + ', running tasks...');
        scriptsRev();
        console.log('File ' + path + ' Done');
    });
}

function imgWatch() {
    var watcher = gulp.watch('img/**/*.*');
    watcher.on('all', function (event, path, stats) {
        console.log('File ' + path + ' was ' + event + ', running tasks...');
        img();
        console.log('File ' + path + ' Done');
    });
}

function html1Watch() {
    var watcher = gulp.watch('src/**/*.html');
    watcher.on('all', function (event, path, stats) {
        console.log('File ' + path + ' was ' + event + ', running tasks...');
        copyHtmlFiles();
        scriptsRev();
        console.log('File ' + path + ' Done');
    });
}

function cssApp2Watch() {
    var watcher = gulp.watch('css/app/app.scss');
    watcher.on('all', function (event, path, stats) {
        console.log('File ' + path + ' was ' + event + ', running tasks...');
        styles();
        console.log('File ' + path + ' Done');
    });
}

function cssVendorWatch() {
    var watcher = gulp.watch('css/vendor/**/*.css');
    watcher.on('all', function (event, path, stats) {
        console.log('File ' + path + ' was ' + event + ', running tasks...');
        stylesVendor();
        console.log('File ' + path + ' Done');
    });
}

function cleanBuild() {
    return gulp.src(buildDest, {read: false})
        .pipe(clean());
}

function img() {
    return gulp.src(config.img.source)
        .pipe(gulp.dest(config.img.dest));
}

function fonts() {
    return gulp.src(config.fonts.source)
        .pipe(gulp.dest(config.fonts.dest));
}

function copyHtmlFiles() {
    return gulp.src(config.html.templates)
        .pipe(gulp.dest(buildDest));
}

function styles() {
    var _targetEnv = argv.env === undefined ? 'dev' : argv.env;
    return gulp.src(config.appScss.source)
        .pipe(replace('%%PROTOCOL%%', config.site[_targetEnv].protocol))
        .pipe(sass())
        .pipe(rename("app.min.css"))
        .pipe(prefix('last 2 versions'))
        .pipe(minifyCss())
        .pipe(gulp.dest(config.cssDist));
}

function stylesVendor() {
    return gulp.src(config.vendorCss.source)
        .pipe(concatCss(config.vendorCss.dest))
        .pipe(minifyCss())
        .pipe(gulp.dest(config.cssDist))
}

function scripts() {
    return gulp.src(config.scripts.source)
        .pipe(concat(config.jsUnCompressed))
        .pipe(gulp.dest(config.scripts.dest))
        .pipe(preprocess({context: {BUILD_ENV: 'dev', DEBUG: true}}))
        .pipe(uglify())
        .pipe(concat(config.jsCompressed))
        .pipe(gulp.dest(config.scripts.dest));
}
