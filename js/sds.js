
/*
 0000000  0000000     0000000
000       000   000  000     
0000000   000   000  0000000 
     000  000   000       000
0000000   0000000    0000000
 */
var _, args, chalk, colors, cp, data, err, extname, find, fs, get, i, j, k, len, len1, load, log, nom, noon, o, p, path, ref, result, s, v;

_ = require('lodash');

fs = require('fs');

path = require('path');

chalk = require('chalk');

noon = require('noon');

nom = require('nomnom');

get = require('./get');

find = require('./find');

load = require('./load');

log = console.log;

args = nom.script('sds').options({
  file: {
    position: 0,
    help: 'the file to search in',
    list: false,
    required: false
  },
  key: {
    abbr: 'k',
    help: 'key to search'
  },
  value: {
    abbr: 'v',
    help: 'value to search'
  },
  path: {
    abbr: 'p',
    help: 'path to search'
  },
  format: {
    abbr: 'f',
    help: 'output format'
  },
  object: {
    abbr: 'o',
    help: 'output the object',
    flag: true,
    hidden: true
  },
  result: {
    abbr: 'r',
    help: 'output the value',
    flag: true,
    hidden: true
  },
  json: {
    abbr: 'j',
    help: 'parse as json',
    flag: true
  },
  cson: {
    abbr: 'c',
    help: 'parse as cson',
    flag: true
  },
  noon: {
    abbr: 'n',
    help: 'parse as noon',
    flag: true
  },
  yaml: {
    abbr: 'y',
    help: 'parse as yaml',
    flag: true
  },
  colors: {
    toggle: true,
    "default": true,
    help: 'use ansi colors'
  },
  version: {
    abbr: 'V',
    help: 'output version',
    flag: true,
    hidden: true
  }
}).help(chalk.blue("Format:\n") + "\   @k key\n\   @v value\n\   @o object\n\   @p path\n\t \n\   default format is \"@p @v\"\n\t\n\   shortcuts: -o for @o\n\              -r for @v and no leading empty line\n\t  ").parse();

err = function(msg) {
  log(chalk.red("\n" + msg + "\n"));
  return process.exit();
};

if (args.version) {
  cp = require('child_process');
  log(String(cp.execSync(__dirname + "/../bin/sds " + __dirname + "/../package.json -k version -r")));
  process.exit();
}

if (args.file == null) {
  if (fs.existsSync('./package.json')) {
    args.file = './package.json';
  } else {
    log(nom.getUsage());
    err('no input file provided!');
  }
} else if (!fs.existsSync(args.file)) {
  log(nom.getUsage());
  err("can't find file: " + (chalk.yellow.bold(args.file)));
}

extname = args.json != null ? '.json' : args.cson != null ? '.cson' : args.noon != null ? '.noon' : args.yaml != null ? '.yaml' : path.extname(args.file);

if (extname !== '.json' && extname !== '.cson' && extname !== '.plist' && extname !== '.noon' && extname !== '.yml' && extname !== '.yaml') {
  err("unknown file type: " + (chalk.yellow.bold(extname)) + ". use --json --cson --noon or --yaml to force parsing.");
}

data = load(args.file);

if (!((ref = data.constructor.name) === 'Array' || ref === 'Object')) {
  err("no structure in file: " + (chalk.yellow.bold(args.file)));
}

if (args.colors) {
  colors = {
    key: chalk.gray,
    path: chalk.bold.gray,
    "null": chalk.bold.blue,
    string: chalk.yellow,
    value: chalk.bold.magenta
  };
} else {
  colors = {
    key: function(s) {
      return s;
    },
    path: function(s) {
      return s;
    },
    value: function(s) {
      return s;
    },
    string: function(s) {
      return s;
    },
    "null": function(s) {
      return s;
    }
  };
}

if ((args.key == null) && (args.value == null) && (args.path == null)) {
  s = noon.stringify(data, {
    colors: colors
  });
  log(s);
  log('');
} else {
  result = (args.path != null) && (args.value != null) ? find.pathValue(data, args.path, args.value) : args.path != null ? find.path(data, args.path) : (args.key != null) && (args.value != null) ? find.keyValue(data, args.key, args.value) : args.key != null ? find.key(data, args.key) : find.value(data, args.value);
  if (args.object || args.result || args.format) {
    if (!args.result) {
      log('');
    }
    for (i = 0, len = result.length; i < len; i++) {
      path = result[i];
      p = path.join('.');
      k = _.last(path);
      v = get(data, path);
      if (args.object) {
        path.pop();
        s = noon.stringify(get(data, path), {
          colors: colors
        });
      } else if (args.result) {
        s = noon.stringify(v, {
          colors: colors
        });
      } else if (args.format) {
        s = args.format;
        s = s.replace('@k', colors.key(k));
        s = s.replace('@p', colors.path(p));
        s = s.replace('@v', noon.stringify(v, {
          colors: colors
        }));
        if (args.format.indexOf('@o') >= 0) {
          path.pop();
          o = noon.stringify(get(data, path), {
            colors: true
          });
          s = s.replace('@o', o);
        }
      } else {
        o = {};
        o[p] = v;
        s = noon.stringify(o, {
          colors: colors
        });
      }
      log(s);
    }
  } else {
    o = {};
    for (j = 0, len1 = result.length; j < len1; j++) {
      path = result[j];
      o[path.join('.')] = get(data, path);
    }
    s = noon.stringify(o, {
      colors: colors
    });
    log(s);
  }
  if (!args.result) {
    log('');
  }
}
