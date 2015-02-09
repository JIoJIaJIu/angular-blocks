var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


gulp.task('default', function () {
    gulp.run('build');
});

gulp.task('build', function () {
    gulp.src('libs/*.js')
        .pipe(concat('angular-blocks.js'))
        .pipe(gulp.dest('./'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
    gulp.watch('libs/*.js')
        .on('change', function () {
            gulp.run('build');
        });
});
