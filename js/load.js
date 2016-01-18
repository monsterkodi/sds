
/*
000       0000000    0000000   0000000  
000      000   000  000   000  000   000
000      000   000  000000000  000   000
000      000   000  000   000  000   000
0000000   0000000   000   000  0000000
 */
var chalk, err, fs, load, path;

fs = require('fs');

chalk = require('chalk');

path = require('path');

err = function(msg) {
  return console.log(chalk.red("\n" + msg + "\n"));
};

load = function(p) {
  var extname, str;
  extname = path.extname(p);
  if (extname === '.plist') {
    return require('simple-plist').readFileSync(p);
  } else {
    str = fs.readFileSync(p, 'utf8');
    if (str.length <= 0) {
      err("empty file: " + (chalk.yellow.bold(p)));
      return null;
    }
    switch (extname) {
      case '.json':
        return JSON.parse(str);
      case '.cson':
        return require('cson').parse(str);
      case '.noon':
        return require('noon').parse(str);
      case '.yml':
      case '.yaml':
        return require('js-yaml').load(str);
      default:
        return require('noon').parse(str);
    }
  }
};

module.exports = load;
