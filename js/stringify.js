
/*
 0000000  000000000  00000000   000  000   000   0000000   000  00000000  000   000
000          000     000   000  000  0000  000  000        000  000        000 000 
0000000      000     0000000    000  000 0 000  000  0000  000  000000      00000  
     000     000     000   000  000  000  0000  000   000  000  000          000   
0000000      000     000   000  000  000   000   0000000   000  000          000
 */
var _, defaults, stringify;

_ = require('lodash');

defaults = {
  ext: '.noon',
  indent: '    '
};

stringify = function(data, options) {
  var opt;
  if (options == null) {
    options = {};
  }
  opt = _.assign(_.clone(defaults), options);
  switch (opt.ext) {
    case '.json':
      return JSON.stringify(data, null, opt.indent);
    case '.cson':
      return require('cson').stringify(data, null, opt.indent);
    case '.noon':
      return require('noon').stringify(data);
    case '.plist':
      return require('simple-plist').stringify(data);
    case '.yml':
    case '.yaml':
      return require('js-yaml').dump(data);
  }
};

module.exports = stringify;
