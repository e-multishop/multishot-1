var gulp = require("gulp");
var gap = require("gulp-append-prepend");
var replace = require("gulp-replace");

gulp.task("licenses", async function () {
  // this is to add Creative Tim licenses in the production mode for the minified js
  gulp
    .src("build/static/js/*chunk.js", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (http://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Creative Tim licenses in the production mode for the minified html
  gulp
    .src("build/index.html", { base: "./" })
    .pipe(
      gap.prependText(`<!--

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (http://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

-->`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Creative Tim licenses in the production mode for the minified css
  gulp
    .src("build/static/css/*chunk.css", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (http://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});

gulp.task("addBasePath", function() {
  return gulp.src('./build/index.html')
    .pipe(replace('<head>', '<head><base href="/admin/">'))
    .pipe(gulp.dest('./build/index.html'));
});

gulp.task('updateReferences', function() {
  return gulp.src('./build/index.html')
    .pipe(replace('/material-dashboard-react', 'material-dashboard-react'))
    .pipe(gulp.dest('./build/index.html'));
});

gulp.task("copyAssets", function() {
  return gulp.src('./build/*')
    .pipe(gulp.dest('./../../api/hasthakatha/public/admin/'));
});

gulp.task('copyAssetsToAshishRepo', function() {
  return gulp.src('./../../api/hasthakatha/*/**')
      .pipe(gulp.dest('./../../heroku-hasthakatha/'))
});

gulp.task("default", gulp.series('addBasePath', 'updateReferences', 'copyAssets', 'copyAssetsToAshishRepo'));
