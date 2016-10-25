var gulp = require("gulp");
var ts = require("gulp-typescript");
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var browserSync = require('browser-sync').create();

var tsProject = ts.createProject("tsconfig.json");

//Start Point
gulp.task("default", ["serve"], function () {

    //Watching changes in the file
    gulp.watch('assets/styles/style.scss', ['sass']);
    gulp.watch('assets/scripts/main.ts', ['typescript']);
    gulp.watch("app/index.html").on("change",function(){
        console.log("html changed");
          //connect.reload() //livereload doesn't work here'
          browserSync.reload();
    });

});

//Typescript parsing
gulp.task("typescript", function () {

    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(rename('app.js'))
        .pipe(gulp.dest("app/scripts"))
        // .pipe(connect.reload());
        .pipe(browserSync.reload({ stream: true }));

});

//SASS parsing
gulp.task('sass', function () {

    return gulp.src('./assets/styles/style.scss')
        .pipe(sass({ style: 'expanded' }))
        .on('error', gutil.log)
        .pipe(gulp.dest('app/styles'))
        // .pipe(connect.reload());
        .pipe(browserSync.reload({ stream: true }));

});


//Building the app
gulp.task("build", ["typescript", 'sass'], function () {

    gutil.log('== Build done ==');

});

//Serving the livereload app
gulp.task('serve:livereload', ["build"], function () {

    connect.server({
        root: './app',
        livereload: true
    });

});

//Serving the app
gulp.task('serve', ["build"], function () {

      browserSync.init({
        server: {
            baseDir: "app",
            index: "index.html"
        },
    });

});