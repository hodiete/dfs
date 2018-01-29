/**
 * @file
 * Defines build tasks.
 *
 * @fileJshint globalstrict: true, node: true */

'use strict';
var path = require('path');

var options = {};

// #############################
// Edit these paths and options.
// #############################.
options.rootPath = {
  project: __dirname + '/',
  styleGuide: __dirname + '/styleguide/',
  theme: __dirname + '/'
};

options.theme = {
  root: options.rootPath.theme,
  css: options.rootPath.theme + 'css/',
  sass: options.rootPath.theme + 'sass/',
  js: options.rootPath.theme + 'js/'
};

// Define the style guide paths and options.
options.styleGuide = {
  source: [
    options.theme.sass,
    options.theme.css + 'style-guide/'
  ],
  destination: options.rootPath.styleGuide,
  css: [
    path.relative(options.rootPath.styleGuide, options.theme.css + 'styles.css'),
    //path.relative(options.rootPath.styleGuide, options.theme.css + 'themes/administration.css'),
    path.relative(options.rootPath.styleGuide, options.theme.css + 'style-guide/kss-only.css')
  ],
  js: [],
  homepage: 'homepage.md',
  title: 'Living Style Guide'
};


// Define the paths to the JS files to lint.
options.eslint = {
  files: [
    options.theme.js + '**/*.js',
    '!' + options.theme.js + '**/*.min.js'
  ]
};

// If your files are on a network share, you may want to turn on polling for
// Gulp and Compass watch commands. Since polling is less efficient, we disable
// polling by default.
var enablePolling = false;
if (!enablePolling) {
  options.gulpWatchOptions = {};
}
else {
  options.gulpWatchOptions = {interval: 1000, mode: 'poll'};
}

// ################################
// Load Gulp and tools we will use.
// ################################.
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  autoprefix  = require('gulp-autoprefixer'),
  del = require('del'),
  runSequence = require('run-sequence'),
  sassLint = require('gulp-sass-lint'),
  sourcemaps = require('gulp-sourcemaps'),
  globbing = require('gulp-css-globbing'),
  sassglob = require('gulp-sass-glob'),
  browserSync = require('browser-sync'),
  shell = require('gulp-shell'),
  sass = require('gulp-sass'),
  debug = require('gulp-debug'),
  importOnce = require('node-sass-import-once'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename');

// The default task.
gulp.task('default', ['build']);

// #################
// Build everything.
// #################.
gulp.task('build', [
  'styles:production',
  'styleguide',
  'administration',
  'business',
  'education',
  'health-human-serv',
  'local-regional-authorities',
  'public-safety',
  'recreation-environment',
  'statewide-elected-officials',
  'transportation-utilities',
  'custom-ig',
  'print',
  'custom-jcope'
], function (cb) {
  // Run linting last, otherwise its output gets lost.
  runSequence(['lint:js'], cb);
});

// Same as build but creates expanded css with sourcemaps.
gulp.task('build:dev', ['styles', 'styleguide'], function (cb) {
  // Run linting last, otherwise its output gets lost.
  runSequence(['lint:js'], cb);
});

// ##########
// Launch the Server
// ##########.
gulp.task('browser-sync', ['styles'], function() {
  browserSync.init({proxy: "webny.local"});

  gulp.watch(options.theme.sass + '**/*.scss', ['styles']);
  gulp.watch(options.theme.css + '**/*.css').on('change', browserSync.reload);
});


/**
 * @task clearcache
 * Clear all caches
 */
gulp.task('clearcache', shell.task([
  'drush @webny.local cr'
]));

/**
 * @task reload
 * Refresh the page after clearing cache
 */
gulp.task('reload', ['clearcache'], function () {
  browserSync.reload();
});

// ##########
// Build CSS.
// ##########.
gulp.task('styles', ['clean:css'], function () {
  return gulp.src(options.theme.sass + 'styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sassglob())
    .pipe(globbing({
      extensions: ['.scss']
    }))
      .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'expanded'
      }))
        .pipe(autoprefix({
          browsers: ['last 5 versions'],
          cascade: false
        }))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(options.theme.css))
          .pipe(browserSync.stream());
});

gulp.task('styles:production', ['clean:css'], function () {
  return gulp.src(options.theme.sass + 'styles.scss')
    .pipe(globbing({
      // Configure it to use SCSS files.
      extensions: ['.scss']
    }))
      .pipe(sassglob())
      .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'compressed'
      }))
        .pipe(autoprefix({
          browsers: ['last 5 versions'],
          cascade: false
        }))
          .pipe(gulp.dest(options.theme.css));
});

// agency - grouping specific style
gulp.task('administration', ['clean:css'], function () {
  return gulp.src(options.theme.sass + 'themes/administration-theme/administration.scss')
    .pipe(sourcemaps.init())
    .pipe(sassglob())
    .pipe(globbing({
      extensions: ['.scss']
    }))
      .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'expanded'
      }))
        .pipe(autoprefix({
          browsers: ['last 5 versions'],
          cascade: false
        }))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(options.theme.css));
});

// agency - grouping specific style
gulp.task('business', ['clean:css'], function () {
  return gulp.src(options.theme.sass + 'themes/business-theme/business.scss')
    .pipe(sourcemaps.init())
    .pipe(sassglob())
    .pipe(globbing({
      extensions: ['.scss']
    }))
      .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'expanded'
      }))
        .pipe(autoprefix({
          browsers: ['last 5 versions'],
          cascade: false
        }))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(options.theme.css));
});

// agency - grouping specific style
gulp.task('education', ['clean:css'], function () {
  return gulp.src(options.theme.sass + 'themes/education-theme/education.scss')
    .pipe(sourcemaps.init())
    .pipe(sassglob())
    .pipe(globbing({
      extensions: ['.scss']
    }))
      .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'expanded'
      }))
        .pipe(autoprefix({
          browsers: ['last 5 versions'],
          cascade: false
        }))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(options.theme.css));
});

// agency - grouping specific style
gulp.task('health-human-serv', ['clean:css'], function () {
  return gulp.src(options.theme.sass + 'themes/health-human-services-theme/health-human-services.scss')
    .pipe(sourcemaps.init())
    .pipe(sassglob())
    .pipe(globbing({
      extensions: ['.scss']
    }))
      .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'expanded'
      }))
        .pipe(autoprefix({
          browsers: ['last 5 versions'],
          cascade: false
        }))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(options.theme.css));
});

// agency - grouping specific style
gulp.task('local-regional-authorities', ['clean:css'], function () {
  return gulp.src(options.theme.sass + 'themes/local-regional-authorities-theme/local-regional-authorities.scss')
    .pipe(sourcemaps.init())
    .pipe(sassglob())
    .pipe(globbing({
      extensions: ['.scss']
    }))
      .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'expanded'
      }))
        .pipe(autoprefix({
          browsers: ['last 5 versions'],
          cascade: false
        }))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(options.theme.css));
});

// agency - grouping specific style
gulp.task('public-safety', ['clean:css'], function () {
  return gulp.src(options.theme.sass + 'themes/public-safety-theme/public-safety.scss')
    .pipe(sourcemaps.init())
    .pipe(sassglob())
    .pipe(globbing({
      extensions: ['.scss']
    }))
      .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'expanded'
      }))
        .pipe(autoprefix({
          browsers: ['last 5 versions'],
          cascade: false
        }))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(options.theme.css));
});

// agency - grouping specific style
gulp.task('recreation-environment', ['clean:css'], function () {
  return gulp.src(options.theme.sass + 'themes/recreation-environment-theme/recreation-environment.scss')
    .pipe(sourcemaps.init())
    .pipe(sassglob())
    .pipe(globbing({
      extensions: ['.scss']
    }))
      .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'expanded'
      }))
        .pipe(autoprefix({
          browsers: ['last 5 versions'],
          cascade: false
        }))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(options.theme.css));
});

// agency - grouping specific style
gulp.task('statewide-elected-officials', ['clean:css'], function () {
  return gulp.src(options.theme.sass + 'themes/statewide-elected-officials-theme/statewide-elected-officials.scss')
    .pipe(sourcemaps.init())
    .pipe(sassglob())
    .pipe(globbing({
      extensions: ['.scss']
    }))
      .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'expanded'
      }))
        .pipe(autoprefix({
          browsers: ['last 5 versions'],
          cascade: false
        }))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(options.theme.css));
});

// agency - grouping specific style
gulp.task('transportation-utilities', ['clean:css'], function () {
  return gulp.src(options.theme.sass + 'themes/transportation-utilities-theme/transportation-utilities.scss')
    .pipe(sourcemaps.init())
    .pipe(sassglob())
    .pipe(globbing({
      extensions: ['.scss']
    }))
      .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'expanded'
      }))
        .pipe(autoprefix({
          browsers: ['last 5 versions'],
          cascade: false
        }))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(options.theme.css));
});

// agency - grouping specific style
gulp.task('custom-ig', ['clean:css'], function () {
  return gulp.src(options.theme.sass + 'themes/custom-ig-theme/custom-ig.scss')
    .pipe(sourcemaps.init())
    .pipe(sassglob())
    .pipe(globbing({
      extensions: ['.scss']
    }))
      .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'expanded'
      }))
        .pipe(autoprefix({
          browsers: ['last 5 versions'],
          cascade: false
        }))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(options.theme.css));
});

gulp.task('styles:styleguide', ['clean:css'], function () {
  return gulp.src([
    options.theme.sass + 'style-guide/kss-only.scss'
  ])
    .pipe(globbing({
      // Configure it to use SCSS files.
      extensions: ['.scss']
    }))
      .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'compressed'
      }))
        .pipe(autoprefix({
          browsers: ['last 5 versions'],
          cascade: false
        }))
          .pipe(gulp.dest(options.theme.css + '/style-guide/'));
});

gulp.task('print', ['clean:css'], function () {
  return gulp.src([
    options.theme.sass + 'print.scss'
  ])
    .pipe(globbing({
      // Configure it to use SCSS files.
      extensions: ['.scss']
    }))
      .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'compressed'
      }))
        .pipe(autoprefix({
          browsers: ['last 5 versions'],
          cascade: false
        }))
          .pipe(gulp.dest(options.theme.css));
});

// agency - grouping specific style
gulp.task('custom-jcope', ['clean:css'], function () {
    return gulp.src(options.theme.sass + 'themes/custom-jcope-theme/custom-jcope.scss')
        .pipe(sourcemaps.init())
        .pipe(sassglob())
        .pipe(globbing({
            extensions: ['.scss']
        }))
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'expanded'
        }))
        .pipe(autoprefix({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(options.theme.css));
});

// ##################
// Build style guide.
// ##################.
var flags = [], values;
// Construct our command-line flags from the options.styleGuide object.
for (var flag in options.styleGuide) {
  if (options.styleGuide.hasOwnProperty(flag)) {
    values = options.styleGuide[flag];
    if (!Array.isArray(values)) {
      values = [values];
    }
    for (var i = 0; i < values.length; i++) {
      flags.push('--' + flag + '=\'' + values[i] + '\'');
    }
  }
}
gulp.task('styleguide', ['clean:styleguide', 'styles:styleguide'], $.shell.task(
  ['kss-node <%= flags %>'],
  {templateData: {flags: flags.join(' ')}}
));


// Debug the generation of the style guide with the --verbose flag.
gulp.task('styleguide:debug', ['clean:styleguide'], $.shell.task(
  ['kss-node <%= flags %>'],
  {templateData: {flags: flags.join(' ') + ' --verbose'}}
));

// #########################
// Lint Sass and JavaScript.
// #########################.
gulp.task('lint', function (cb) {
  runSequence(['lint:js', 'lint:sass'], cb);
});

// Lint JavaScript.
gulp.task('lint:js', function () {
  return gulp.src(options.eslint.files)
    .pipe($.eslint())
    .pipe($.eslint.format());
});

// Lint JavaScript and throw an error for a CI to catch.
gulp.task('lint:js-with-fail', function () {
  return gulp.src(options.eslint.files)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError());
});

// Lint Sass.
gulp.task('lint:sass', function () {
  return gulp.src(options.theme.sass + '**/*.s+(a|c)ss')
    .pipe(sassLint())
    .pipe(sassLint.format());
});

// Lint Sass and throw an error for a CI to catch.
gulp.task('lint:sass-with-fail', function () {
  return gulp.src(options.theme.sass + '**/*.s+(a|c)ss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

// ##############################
// Watch for changes and rebuild.
// ##############################.
gulp.task('watch', ['watch:styleguide', 'watch:js'], function (cb) {
  // Since watch:css will never return, call it last (not as dependency.).
  runSequence(['watch:css'], cb);
});

gulp.task('watch:css', ['styles'], function () {
  return gulp.watch([
    options.theme.sass + '**/*.scss'
  ], options.gulpWatchOptions, ['styles']);
});

gulp.task('watch:css', ['administration'], function () {
  return gulp.watch([
    options.theme.sass + '**/*.scss'
  ], options.gulpWatchOptions, ['administration']);
});

gulp.task('watch:css', ['business'], function () {
  return gulp.watch([
    options.theme.sass + '**/*.scss'
  ], options.gulpWatchOptions, ['business']);
});

gulp.task('watch:css', ['education'], function () {
  return gulp.watch([
    options.theme.sass + '**/*.scss'
  ], options.gulpWatchOptions, ['education']);
});

gulp.task('watch:css', ['health-human-serv'], function () {
  return gulp.watch([
    options.theme.sass + '**/*.scss'
  ], options.gulpWatchOptions, ['health-human-serv']);
});

gulp.task('watch:css', ['local-regional-authorities'], function () {
  return gulp.watch([
    options.theme.sass + '**/*.scss'
  ], options.gulpWatchOptions, ['local-regional-authorities']);
});

gulp.task('watch:css', ['public-safety'], function () {
  return gulp.watch([
    options.theme.sass + '**/*.scss'
  ], options.gulpWatchOptions, ['public-safety']);
});

gulp.task('watch:css', ['recreation-environment'], function () {
  return gulp.watch([
    options.theme.sass + '**/*.scss'
  ], options.gulpWatchOptions, ['recreation-environment']);
});

gulp.task('watch:css', ['statewide-elected-officials'], function () {
  return gulp.watch([
    options.theme.sass + '**/*.scss'
  ], options.gulpWatchOptions, ['statewide-elected-officials']);
});

gulp.task('watch:css', ['transportation-utilities'], function () {
  return gulp.watch([
    options.theme.sass + '**/*.scss'
  ], options.gulpWatchOptions, ['transportation-utilities']);
});

gulp.task('watch:css', ['custom-ig'], function () {
  return gulp.watch([
    options.theme.sass + '**/*.scss'
  ], options.gulpWatchOptions, ['custom-ig']);
});

gulp.task('watch:css', ['print'], function () {
  return gulp.watch([
    options.theme.sass + '**/*.scss'
  ], options.gulpWatchOptions, ['print']);
});

gulp.task('watch:styleguide', ['styleguide'], function () {
  return gulp.watch([
    options.theme.sass + '**/*.scss',
    options.theme.sass + '**/*.hbs'
  ], options.gulpWatchOptions, ['styleguide']);
});

gulp.task('watch:js', ['lint:js'], function () {
  return gulp.watch([options.theme.js + '**/*.js'], options.gulpWatchOptions, [
    'lint:js'
  ]);
});

gulp.task('watch:css', ['custom-jcope'], function () {
    return gulp.watch([
        options.theme.sass + '**/*.scss'
    ], options.gulpWatchOptions, ['custom-jcope']);
});

// ######################
// Clean all directories.
// ######################.
gulp.task('clean', ['clean:css', 'clean:styleguide']);

// Clean style guide files.
gulp.task('clean:styleguide', function (cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`.
  del([
    options.styleGuide.destination + '*.html',
    options.styleGuide.destination + 'public',
    options.theme.css + '**/*.hbs'
  ], {force: true}, cb);
});

// Clean CSS files.
gulp.task('clean:css', function (cb) {
  del([
    options.theme.root + '**/.sass-cache',
    options.theme.css + '**/*.css',
    options.theme.css + '**/*.map'
  ], {force: true}, cb);
});


// Resources used to create this gulpfile.js:
// - http://cgit.drupalcode.org/zen/tree/STARTERKIT/gulpfile.js?h=7.x-6.x
// - https://github.com/google/web-starter-kit/blob/master/gulpfile.js
// - https://github.com/north/generator-north/blob/master/app/templates/Gulpfile.js
