var gulp = require('gulp');
var del = require('del');

gulp.task('cleanAssets', function() {
    return del('./../../api/hasthakatha/public/**', {force: true});
});

gulp.task('copyMainFile', function() {
    return gulp.src('./public/index.html')
        .pipe(gulp.dest('./../../api/hasthakatha/public'));
});

gulp.task('copyAssets', function() {
    return gulp.src('./dist/**')
        .pipe(gulp.dest('./../../api/hasthakatha/public/dist'));
});

gulp.task("default", gulp.series('cleanAssets', 'copyMainFile', 'copyAssets'));