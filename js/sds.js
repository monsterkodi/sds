
/*
 0000000  0000000     0000000
000       000   000  000     
0000000   000   000  0000000 
     000  000   000       000
0000000   0000000    0000000
 */

(function() {
  var _, args, colors, data, err, extname, find, fs, get, i, j, k, len, len1, log, noon, o, p, path, ref, result, s, v;

  _ = require('lodash');

  fs = require('fs');

  path = require('path');

  colors = require('colors');

  noon = require('noon');

  get = require('./get');

  find = require('./find');

  log = console.log;

  args = require('karg')("sds\n    file        . ? the file to search in    . * . = package.json\n    key         . ? key to search            \n    value       . ? value to search\n    path        . ? path to search           \n    format      . ? output format            \n    json        . ? parse as json            . = false\n    noon        . ? parse as noon            . = false\n    cson        . - C                        . = false\n    yaml                                     . = false\n    object                                   . = false\n    result                                   . = false\n    colors      . ? output with ansi colors  . = true\n    \nformat\n    @k  key\n    @v  value\n    @o  object\n    @p  path\n    \nshortcuts \n    -o  for @o\n    -r  for @v and no leading empty line\n\nversion     " + (require(__dirname + "/../package.json").version));

  err = function(msg) {
    log(("\n" + msg + "\n").red);
    return process.exit();
  };

  if (args.file == null) {
    if (fs.existsSync('./package.json')) {
      args.file = './package.json';
    } else {
      err('no input file provided!');
    }
  } else if (!fs.existsSync(args.file)) {
    err("can't find file: " + args.file.yellow.bold);
  }

  extname = args.json ? '.json' : args.cson ? '.cson' : args.noon ? '.noon' : args.yaml ? '.yaml' : path.extname(args.file);

  if (extname !== '.json' && extname !== '.cson' && extname !== '.plist' && extname !== '.noon' && extname !== '.yml' && extname !== '.yaml') {
    err("unknown file type: " + extname.yellow.bold + ". use --json --cson --noon or --yaml to force parsing.");
  }

  data = noon.load(args.file);

  if (!((ref = data.constructor.name) === 'Array' || ref === 'Object')) {
    err("no structure in file: " + args.file.yellow.bold);
  }

  if (args.colors) {
    colors = {
      key: colors.gray,
      path: colors.bold.gray,
      "null": colors.bold.blue,
      string: colors.yellow,
      value: colors.bold.magenta
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
    log('');
    log(s);
    log('');
  } else {
    if (!args.result) {
      log('');
    }
    result = (args.path != null) && (args.value != null) ? find.pathValue(data, args.path, args.value) : args.path != null ? find.path(data, args.path) : (args.key != null) && (args.value != null) ? find.keyValue(data, args.key, args.value) : args.key != null ? find.key(data, args.key) : find.value(data, args.value);
    log(result, data);
    if (args.object || args.result || args.format) {
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

}).call(this);
