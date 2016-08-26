'use strict';
var fs = require('fs');
var fileLocation = `${__dirname}/../foundation-material-design.css`; // eslint-disable-line max-len
// var fileLocation = `${__dirname}/../dist/assets/stylesheets/foundation-material-design.css`; // eslint-disable-line max-len
var builtFileContents = fs.readFileSync(
  fileLocation,
  {
    encoding: 'utf-8'
  }
);


prefixClasses(builtFileContents);

function prefixClasses(fileContents) {
  let goldenRegex = /(\.)(columns|row|small|medium|large|x\-large)/g; // eslint-disable-line max-len
  var matches = fileContents.match(goldenRegex);
  var newFile = fileContents.replace(goldenRegex, '.fmd-$2');

  // if matches is undefined, calling matches.length will throw error
  if (!matches || !matches.length) {
    return console.log('There were no matches, exiting...');
  }
  console.log(`there are ${matches.length} matches`);
  fs.writeFileSync(`${fileLocation}`, newFile);
}
