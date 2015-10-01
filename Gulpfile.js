(function() {
  'use strict';

  var browserSync = require('browser-sync').create();
  var del = require('del');
  var gulp = require('gulp');
  var inject = require('gulp-inject');
  var jshint = require('gulp-jshint');
  var jscs = require('gulp-jscs');
  var runSequence = require('run-sequence');
  var sass = require('gulp-sass');
  var stylish = require('gulp-jscs-stylish');
  var wiredep = require('wiredep').stream;
  var concat = require('gulp-concat');

  var config = require('./config.js');

  gulp.task('default', function(done){
    runSequence(
      'default-1:clean-build-folder-and-main-files',
      'default-2:vet-javascript-files',
      'default-3:copy-all-src-except-scss-to-build',
      'default-4:sass-all-stylesheets',
      // 'default-5:concat-all-bower-css-into-one-file',
      'default-6:concat-all-bower-js-into-one-file',
      'default-7:inject-deps-into-html-files',
      'bower-1:copy-foundation-md-files-to-top-directory',
      'bower-2:inject-deps-into-foundation-md-index',
      // [
      //   'monitor:html',
      //   'monitor:styles'
      // ],
      'default-8:start-server',
      done
    );
  });

  gulp.task('default-1:clean-build-folder-and-main-files', function(){
    return del([
      config.client,
      './foundation-material-design.css',
      './index.html'
    ]);
  });

  gulp.task('default-2:vet-javascript-files', function(){
    return gulp
      .src( config.allJS )
      .pipe( jshint() )
      .pipe( jscs() )
      .on( 'error', function(){} )
      .pipe( stylish.combineWithHintResults() )
      .pipe( jshint.reporter('jshint-stylish') );
  });

  gulp.task('default-3:copy-all-src-except-scss-to-build', function () {
    return gulp
      .src( config.buildComponents )
      .pipe( gulp.dest( config.client ) );
  });

  gulp.task('default-4:sass-all-stylesheets', function(){
    return gulp
      .src( config.srcSASS )
      .pipe(
        sass({
          includePaths: ['bower_components/foundation/scss']
        })
        .on('error', sass.logError))
      .pipe( gulp.dest( config.client ) )
      .pipe( browserSync.stream() );
  });

  // gulp.task('default-5:concat-all-bower-css-into-one-file', function() {
  //   return gulp
  //     .src(require('wiredep')().css)
  //     .pipe(concat('bower-styles.css'))
  //     .pipe(gulp.dest(config.clientStyles));
  // });

  gulp.task('default-6:concat-all-bower-js-into-one-file', function () {
    return gulp
      .src(require('wiredep')({
        "overrides": {
          "foundation": {
            "main": [
              "js/foundation/foundation.js"
              // "js/foundation/foundation.abide.js",
              // "js/foundation/foundation.accordion.js",
              // "js/foundation/foundation.alert.js",
              // "js/foundation/foundation.clearing.js",
              // "js/foundation/foundation.dropdown.js",
              // "js/foundation/foundation.equalizer.js",
              // "js/foundation/foundation.interchange.js",
              // "js/foundation/foundation.joyride.js",
              // "js/foundation/foundation.magellan.js",
              // "js/foundation/foundation.offcanvas.js",
              // "js/foundation/foundation.orbit.js",
              // "js/foundation/foundation.reveal.js",
              // "js/foundation/foundation.slider.js",
              // "js/foundation/foundation.tab.js",
              // "js/foundation/foundation.tooltip.js",
              // "js/foundation/foundation.topbar.js",
            ]
          }
        }
      }).js)
      .pipe(concat('bower-scripts.js'))
      .pipe(gulp.dest(config.clientScripts));
  });

  gulp.task('default-7:inject-deps-into-html-files', function() {
    return injectBowerDeps('build/**/*.html', config.client);
  });

  gulp.task('default-8:start-server', function() {
    browserSync.init({
        server: {
          baseDir: './'
        }
    });
  });

  //////////////////////////
  // Bower-specific Tasks //
  //////////////////////////
  gulp.task('bower-1:copy-foundation-md-files-to-top-directory', function() {
    gulp
      .src('src/index.html')
      .pipe(gulp.dest('./'));
    return gulp
      .src('build/assets/stylesheets/foundation-material-design.css')
      .pipe(gulp.dest('./'));
  });

  gulp.task('bower-2:inject-deps-into-foundation-md-index', function() {
    return injectBowerDeps('./index.html', './');
  });

  function injectBowerDeps(fromHere, toHere){
    gulp
      .src(fromHere)
      .pipe(
        inject(
          gulp.src(
            [
              'build/**/bower-scripts.js',
              // 'build/**/bower-styles.css',
              config.allClient
            ]
          ),
          { relative: true }
        )
      )
      .pipe( gulp.dest(toHere) );
  }

  ////////////////////////
  // Monitor HTML Tasks //
  ////////////////////////
  gulp.task('monitor:html', function(){
    return gulp.watch( config.srcHTML, ['update:html']);
  });

  gulp.task('update:html', function(done) {
    runSequence(
      'clean',
      'sass',
      'concat:js',
      'build',
      'inject',
      browserSync.reload,
      done
    );
  });

  gulp.task('monitor:styles', function(){
    gulp.watch( 'src/**/*.scss', ['sass'] );
  });

}());
