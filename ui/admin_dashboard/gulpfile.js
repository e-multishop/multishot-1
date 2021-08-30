const gulp = require("gulp");
const replace = require("gulp-replace");
const del = require("del");

gulp.task("addBasePath", function() {
  return gulp.src('./build/index.html')
    .pipe(replace('<head>', '<head><base href="/admin/">'))
    .pipe(gulp.dest('./build'));
});

gulp.task('updateReferences', function() {
  return gulp.src('./build/index.html')
    .pipe(replace('/material-dashboard-react/', ''))
    .pipe(gulp.dest('./build'));
});

gulp.task("copyAssets", function() {
  return gulp.src('./build/**')
    .pipe(gulp.dest('./../../api/hasthakatha/public/admin/', {overwrite: true}));
});

gulp.task('cleanHerokuAssets', function() {
  return del('./../../heroku-hasthakatha/public/**', {force: true});
});

gulp.task('copyAssetsToAshishRepo', function() {
  return gulp.src(['./../../api/hasthakatha/**','!./../../api/hasthakatha/node_modules/**'])
      .pipe(gulp.dest('./../../heroku-hasthakatha/'))
});

gulp.task("default", gulp.series('addBasePath', 'updateReferences', 'copyAssets', 'cleanHerokuAssets', 'copyAssetsToAshishRepo'));
