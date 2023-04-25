const {src, dest, series, parallel, watch} = require('gulp') 
const concat = require('gulp-concat')       
const clean = require('gulp-clean')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()
const { path } = require('./gulp/const.js')

function serveTask(done){
    browserSync.init({
        server: {
            baseDir: path.destination
        },
        browser: 'chrome'
    }) 

    watch(path.srcHtml, series(copyhtmlTask, reloadBrowser))
    watch(path.allJsFilesTemp, series(copyJsTask, reloadBrowser))
    watch(path.allCssFilesTemp, series(copyCssTask, reloadBrowser))

    done()
}

function reloadBrowser(done){
    browserSync.reload()
    done()
}

function buildTask() {
    return series(cleanDistTask, parallel(copyhtmlTask, copyJsTask, copyCssTask, copyJsVendorTask))
}

function copyhtmlTask(){
    return src(path.srcHtml)
    .pipe(dest(path.destination))
}

function copyJsTask(){           
    return src(path.jsSrc)
    .pipe(concat(path.appJs))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(dest(path.destination))
}

function copyJsVendorTask(){
    return src(path.vendorSrc)
    .pipe(concat(path.vendorJs))
    .pipe(dest(path.destination))
}

function copyCssTask(){
    return src(path.allCssFilesTemp)
    .pipe(concat(path.cssDest))
    .pipe(dest(path.destination))
}

function cleanDistTask(){
    return src(path.destination, {read: false, allowEmpty: true})
        .pipe(clean()) 
}
  
exports.build = buildTask()
exports.serve = series(buildTask(), serveTask)