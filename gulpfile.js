var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify'); // minifikacja JS
var concat = require('gulp-concat'); // konkatenacja Js
var imagemin = require('gulp-imagemin'); //optymalizacja obrazkow
var changed = require('gulp-changed'); 
var htmlReplace = require('gulp-html-replace');
var htmlMin = require('gulp-htmlmin'); // minifikacja html
var del = requier('del'); //usunięcie dist 
var sequence = require('run-sequence'); // prosec dev


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
   .pipe(sourcemaps.init())
   .pipe(sass().on('error', sass.logError))
   .pipe(autoprefixer({
       browsers:['last 3 versions']
   }))
   .pipe(sourcemaps.write())
   .pipe(gulp.dest('css'))
   .pipe(browserSync.stream());
});

//gulp.task('css', function(){ // minifikacja CSS
//    return gulp.src('css/**/*.css')
//    .pipe(concat('style.css')) //konkatenacja CSS
//    .pipe(cleanCSS())
//    .pipe(gulp.dest('dist/css'));
//})
//
//gulp.task('js', function(){ // minifikacja JS
//   return gulp.src('js/**/*.js')
//   .pipe(concat('script.js')) // konkatenacja JS
//   .pipe(uglify())
//   .pipe(gulp.dest('dist/js'));
//});

gulp.task('img',function(){
    return gulp.src('img/**/*.{jpg,jpeg,png,gif}')
    .pipe(changed('dist/img'))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
})

//gulp.task('html',function(){
//    return gulp.src('/*.html')
//    .pipe(htmlReplace({
//        'css': 'css/style.css' // add in html build and endbuild for css and js
//        'js': 'js/script.js'
//    }))
//    .pipe(htmlMin({
//        sortAttributes: true, // ustawienie attr alfabetycznie
//        sortClassName: true, // ustawienie class alfabetycznie
//        collapseWhitespace: true // minifikacja html
//    }))
//    .pipe(gulp.dest('dist/'))
//})
//gulp.task('clean',function({
//    return del(['dist']);
//}));
//    
//gulp.task('build', function(){
//    sequence('clean', ['html','js','css','img'])
//});

gulp.task("default", ['serve']);