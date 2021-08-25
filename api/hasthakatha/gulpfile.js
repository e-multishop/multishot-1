var gulp = require('gulp');

gulp.task('copyAssetsToAshishRepo', function() {
    return gulp.src('./*')
        .pipe(gulp.dest('./../../heroku-hasthakatha/'))
});

gulp.task("default", gulp.series('copyAssetsToAshishRepo'));