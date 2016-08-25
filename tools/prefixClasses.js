'use strict';
var fs = require('fs');
var fileLocation = `${__dirname}/../dist/assets/stylesheets/foundation-material-design.css`; // eslint-disable-line max-len
var builtFileContents = fs.readFileSync(
  fileLocation,
  {
    encoding: 'utf-8'
  }
);


prefixClasses(builtFileContents);

function prefixClasses(fileContents) {
  let goldenRgex = /\.((columns?|row|small|medium|large|x\-large).{1,})(\s|\.)/g; // eslint-disable-line max-len
  var matches = fileContents.match(goldenRgex);
  var newFile = fileContents.replace(goldenRgex, '.fmd-$1');
  console.log(`there are ${matches.length} matches`);
  fs.writeFileSync(`${fileLocation}`, newFile);
}
