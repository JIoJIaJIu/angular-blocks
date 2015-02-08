var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('build', function () {
    gulp.src('libs/*.js')
        .pipe(concat('angular-blocks.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
    gulp.watch('libs/*.js')
        .on('change', function () {
            gulp.src('libs/*.js')
                .pipe(concat('angular-blocks.js'))
                .pipe(gulp.dest('./'));
        });
});
