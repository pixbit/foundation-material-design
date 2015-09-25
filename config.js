var src = 'src/';
var client = 'build/';
module.exports = {
  allJS: [
    src + '**/*.js'//,
    // '!' + src + 'assets/vendor/**/*.js'
  ],
  allClient: client + '**/*',
  allSrc: src + '**/*',
  browserReloadDelay: 1500,
  buildComponents: [
    src + '**/*.module.js',
    src + '**/*.*',
    '!' + src + '**/*.scss',
    '!' + src + '**/*.spec.js'
  ],
  clientCSS: client + '**/*.css',
  clientJS: client + '**/*.js',
  client: client,
  clientIndex: client + 'index.html',
  clientStyles: client + 'assets/stylesheets/',
  clientScripts: client + 'assets/scripts/',
  index: src + 'index.html',
  mainSass: src + 'assets/stylesheets/foundation-material-design.scss',
  srcSASS: src + '**/*.scss',
  srcHTML: src + '**/*.html',
  srcJS: src + '**/*.js'
};
