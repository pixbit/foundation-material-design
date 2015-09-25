(function() {
  'use strict';

  var del = require('del');
  var gulp = require('gulp');
  var jscs = require('gulp-jscs');
  var sass = require('gulp-sass');
  var concat = require('gulp-concat');
  var inject = require('gulp-inject');
  var jshint = require('gulp-jshint');
  var wiredep = require('wiredep').stream;
  var runSequence = require('run-sequence');
  var stylish = require('gulp-jscs-stylish');
  var browserSync = require('browser-sync').create();

  var config = require('./config.js');

  gulp.task('default', function(done){
    runSequence(
      'clean',
      'vet',
      'sass',
      'concat:js', 
      'build',
      'inject',
      'server',
      [
        'monitor:html'
      ],
      done
    );
  });

  gulp.task('server', function() {
    browserSync.init({
        server: {
          baseDir: './build'
        }
    });
  });

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

  gulp.task('clean', function(){
    return del([ config.client ]);
  });

  //////////////////////
  // Javascript Tasks //
  //////////////////////

  gulp.task('concat:js', function () {
    return gulp
      .src(require('wiredep')({
        "overrides": {
          "foundation": {
            "main": [
              "js/foundation.js",
              "js/foundation/foundation.dropdown.js"
            ]
          }
        }
      }).js)
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest(config.clientScripts));
  });

  gulp.task('inject', function() {
    return gulp
      .src( config.clientIndex )
      .pipe(
        inject(
          gulp.src(
            [
              config.clientScripts + 'scripts.js',
              config.clientStyles + 'foundation-material-design.css',
              config.allClient
            ]
          ),
          { relative: true }
        )
      )
      .pipe( gulp.dest( config.client ) );
  });

  ///////////////
  // CSS Tasks //
  ///////////////


  gulp.task('sass', function(){
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

  gulp.task('build', function(){
    return gulp
      .src( config.buildComponents )
      .pipe( gulp.dest( config.client ) );
  });

  //////////////////////
  // Javascript Tasks //
  //////////////////////

  gulp.task('vet', function(){
    return gulp
      .src( config.allJS )
      .pipe( jshint() )
      .pipe( jscs() )
      .on( 'error', function(){} )
      .pipe( stylish.combineWithHintResults() )
      .pipe( jshint.reporter('jshint-stylish') );
  });

}());
