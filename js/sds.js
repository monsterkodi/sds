
/*
 0000000  0000000     0000000
000       000   000  000     
0000000   000   000  0000000 
     000  000   000       000
0000000   0000000    0000000
 */

(function() {
  var _, args, argsFile, colors, data, error, extname, file, find, fs, get, i, j, k, l, len, len1, len2, log, noon, o, out, outext, p, path, ref, ref1, ref2, ref3, result, s, set, v,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ = require('lodash');

  fs = require('fs');

  path = require('path');

  colors = require('colors');

  noon = require('noon');

  find = require('./find');

  log = console.log;


  /*
   0000000   00000000    0000000    0000000
  000   000  000   000  000        000     
  000000000  0000000    000  0000  0000000 
  000   000  000   000  000   000       000
  000   000  000   000   0000000   0000000
   */

  args = require('karg')("sds\n    file        . ? the file to search in           . *   . = package.json\n    key         . ? key to search            \n    value       . ? value to search\n    path        . ? path to search           \n    format      . ? result format\n    set         . ? set values \n    save        . ? write result back to input file . - S . = false \n    output      . ? the file to write or stdout     . - F     \n    json        . ? parse as json                         . = false\n    noon        . ? parse as noon                         . = false\n    cson        . - C                                     . = false\n    yaml                                                  . = false\n    object                                                . = false\n    result                                                . = false\n    colors      . ? output with ansi colors               . = true\n    \nformat\n    @k  key\n    @v  value\n    @o  object\n    @p  path\n        \nshortcuts \n    -o  for @o\n    -r  for @v and no leading empty line\n\nversion     " + (require(__dirname + "/../package.json").version));


  /*
  00000000  00000000   00000000    0000000   00000000 
  000       000   000  000   000  000   000  000   000
  0000000   0000000    0000000    000   000  0000000  
  000       000   000  000   000  000   000  000   000
  00000000  000   000  000   000   0000000   000   000
   */

  error = function(msg) {
    log(("\n" + msg + "\n").red);
    return process.exit();
  };

  if (args.file == null) {
    if (fs.existsSync('./package.json')) {
      args.file = './package.json';
    } else if (fs.existsSync('./package.noon')) {
      args.file = './package.noon';
    } else {
      error('no input file provided!');
    }
  } else if (!fs.existsSync(args.file)) {
    argsFile = args.file;
    if ((args.value == null) && (args.key == null) && (args.path == null)) {
      ref = ['./package.json', './package.noon'];
      for (i = 0, len = ref.length; i < len; i++) {
        file = ref[i];
        if (fs.existsSync(file)) {
          args.result = true;
          args.path = argsFile;
          args.file = file;
          break;
        }
      }
    }
    if (argsFile === args.file) {
      error("can't find file: " + args.file.yellow.bold);
    }
  }


  /*
  00000000  000   000  000000000  000   000   0000000   00     00  00000000
  000        000 000      000     0000  000  000   000  000   000  000     
  0000000     00000       000     000 0 000  000000000  000000000  0000000 
  000        000 000      000     000  0000  000   000  000 0 000  000     
  00000000  000   000     000     000   000  000   000  000   000  00000000
   */

  extname = args.json ? '.json' : args.cson ? '.cson' : args.noon ? '.noon' : args.yaml ? '.yaml' : path.extname(args.file);

  if (indexOf.call(noon.extnames, extname) < 0) {
    error("unknown file type: " + extname.yellow.bold + ". use --json --cson --noon or --yaml to force parsing.");
  }

  outext = extname;

  if (ref1 = args.output, indexOf.call(noon.extnames, ref1) >= 0) {
    outext = args.output;
    delete args.output;
  }


  /*
  000       0000000    0000000   0000000  
  000      000   000  000   000  000   000
  000      000   000  000000000  000   000
  000      000   000  000   000  000   000
  0000000   0000000   000   000  0000000
   */

  data = noon.load(args.file, extname);

  if (!((ref2 = data.constructor.name) === 'Array' || ref2 === 'Object')) {
    error("no structure in file: " + args.file.yellow.bold);
  }


  /*
   0000000   0000000   000       0000000   00000000    0000000
  000       000   000  000      000   000  000   000  000     
  000       000   000  000      000   000  0000000    0000000 
  000       000   000  000      000   000  000   000       000
   0000000   0000000   0000000   0000000   000   000  0000000
   */

  if (args.colors) {
    colors = {
      key: colors.gray,
      "null": colors.bold.blue,
      string: colors.yellow.bold,
      value: colors.bold.white,
      url: colors.yellow,
      "true": colors.blue.bold,
      "false": colors.gray.dim,
      path: colors.green,
      value: colors.white,
      semver: colors.red,
      number: colors.magenta,
      visited: colors.red
    };
  } else {
    colors = false;
  }


  /*
   0000000   000   000  000000000
  000   000  000   000     000   
  000   000  000   000     000   
  000   000  000   000     000   
   0000000    0000000      000
   */

  if ((args.output != null) || args.save) {
    colors = false;
  }

  out = function(s) {
    var err, outfile, ref3;
    outfile = (ref3 = args.output) != null ? ref3 : (args.save ? args.file : void 0);
    if (outfile != null) {
      require('mkpath').sync(path.dirname(outfile));
      try {
        return require('write-file-atomic')(outfile, s, function(err) {
          if (err) {
            return error("can't write " + outfile.bold.yellow + ": " + err);
          } else {
            return log(("wrote " + outfile.bold.white).gray);
          }
        });
      } catch (error1) {
        err = error1;
        return error("can't write " + outfile.bold.yellow + ": " + err);
      }
    } else {
      return log(s);
    }
  };

  if (args.set != null) {

    /*
     0000000  00000000  000000000
    000       000          000   
    0000000   0000000      000   
         000  000          000   
    0000000   00000000     000
     */
    set = require('./set');
    ref3 = noon.parse(args.set);
    for (p in ref3) {
      v = ref3[p];
      set(data, p, v);
    }
    out(noon.stringify(data, {
      colors: colors,
      ext: outext
    }));
  } else if ((args.key == null) && (args.value == null) && (args.path == null)) {

    /*
    000      000   0000000  000000000
    000      000  000          000   
    000      000  0000000      000   
    000      000       000     000   
    0000000  000  0000000      000
     */
    s = noon.stringify(data, {
      colors: colors,
      ext: outext
    });
    out('\n' + s + '\n');
  } else {

    /*
     0000000  00000000   0000000   00000000    0000000  000   000
    000       000       000   000  000   000  000       000   000
    0000000   0000000   000000000  0000000    000       000000000
         000  000       000   000  000   000  000       000   000
    0000000   00000000  000   000  000   000   0000000  000   000
     */
    get = require('./get');
    if (!args.result) {
      log('');
    }
    result = (args.path != null) && (args.value != null) ? find.pathValue(data, args.path, args.value) : args.path != null ? find.path(data, args.path) : (args.key != null) && (args.value != null) ? find.keyValue(data, args.key, args.value) : args.key != null ? find.key(data, args.key) : find.value(data, args.value);
    if (args.object || args.result || args.format) {
      for (j = 0, len1 = result.length; j < len1; j++) {
        path = result[j];
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
        out(s);
      }
    } else {
      o = {};
      for (l = 0, len2 = result.length; l < len2; l++) {
        path = result[l];
        o[path.join('.')] = get(data, path);
      }
      s = noon.stringify(o, {
        colors: colors
      });
      out(s);
    }
    if (!args.result) {
      out('');
    }
  }

}).call(this);
