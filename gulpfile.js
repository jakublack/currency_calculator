var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
//var sourcemaps = require('gulp-sourcemaps');

gulp.task('reload',function(){
    browserSync.reload();
}) 

gulp.task('serve',['sass'],function(){
    browserSync({
        server:'./'
    });
    gulp.watch('*.html',['reload']);
    gulp.watch('./js/**/*.js',['reload']);
    gulp.watch('scss/**/*.scss',['sass']);
});

gulp.task('sass',function(){
   return gulp.src('scss/**/*.scss')
   //.pipe(sourcemaps.init())
   .pipe(sass().on('error', sass.logError))
   //.pipe(sourcemaps.write())
   .pipe(gulp.dest('css'))
   .pipe(browserSync.stream());
});

gulp.task("default", ['serve']);