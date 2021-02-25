// koffee 1.14.0

/*
 0000000  0000000     0000000
000       000   000  000     
0000000   000   000  0000000 
     000  000   000       000
0000000   0000000    0000000
 */
var args, error, extname, find, fs, getExtname, handleData, karg, kolor, noon, outext, pipeData, pipeMode, slash, startFileSearch,
    indexOf = [].indexOf;

noon = require('noon');

slash = require('path');

fs = require('fs');

karg = require('karg');

find = require('./find');

kolor = require('klor').kolor;

kolor.globalize();

args = karg("sds\n    file        . ? the file to search in           . *   . = package.json\n    key         . ? key to search            \n    value       . ? value to search\n    path        . ? path to search           \n    format      . ? result format\n    set         . ? set values \n    save        . ? write result back to input file . - S . = false \n    output      . ? the file to write or stdout     . - F     \n    json        . ? parse as json                         . = false\n    noon        . ? parse as noon                         . = false\n    object                                                . = false\n    result                                                . = false\n    colors      . ? output with ansi colors               . = false\n    \nformat\n    @k  key\n    @v  value\n    @o  object\n    @p  path\n        \nshortcuts \n    -o  for -f @o\n    -r  for -f @v and no leading empty line\n\nversion     " + (require(__dirname + "/../package.json").version));

error = function(msg) {
    console.log(("\n" + msg + "\n").red);
    return process.exit();
};

extname = '';

outext = '';

handleData = function(data) {
    var colors, get, i, j, k, len, len1, o, out, p, path, ref, ref1, result, s, set, v;
    if ((ref = !data.constructor.name) === 'Array' || ref === 'Object') {
        console.error("no structure in data: " + (bold(yellow(data))));
    }
    colors = args.colors;
    if ((args.output != null) || args.save) {
        colors = false;
    }
    out = function(s) {
        var err, outfile, ref1;
        outfile = (ref1 = args.output) != null ? ref1 : (args.save ? args.file : void 0);
        if (outfile != null) {
            fs.mkdirSync(slash.dirname(outfile), {
                recursive: true
            });
            try {
                return fs.writeFile(outfile, s, 'utf8', function(err) {
                    if (err) {
                        return console.error("can't write " + (bold(yellow(outfile))) + ": " + err);
                    } else {
                        return console.log(gray("wrote " + (bold(white(outfile)))));
                    }
                });
            } catch (error1) {
                err = error1;
                return console.error("can't write " + (bold(yellow(outfile))) + ": " + err);
            }
        } else {
            return console.log(s);
        }
    };
    if (args.set != null) {
        set = require('./set');
        ref1 = noon.parse(args.set);
        for (p in ref1) {
            v = ref1[p];
            set(data, p, v);
        }
        return out(noon.stringify(data, {
            colors: colors,
            ext: outext
        }));
    } else if ((args.key == null) && (args.value == null) && (args.path == null)) {
        s = noon.stringify(data, {
            colors: colors,
            ext: outext
        });
        return out('\n' + s + '\n');
    } else {
        get = require('./get');
        if (!args.result) {
            console.log('');
        }
        result = (args.path != null) && (args.value != null) ? find.pathValue(data, args.path, args.value) : args.path != null ? find.path(data, args.path) : (args.key != null) && (args.value != null) ? find.keyValue(data, args.key, args.value) : args.key != null ? find.key(data, args.key) : find.value(data, args.value);
        if (args.object || args.result || args.format) {
            for (i = 0, len = result.length; i < len; i++) {
                path = result[i];
                p = path.join('.');
                k = path[path.length - 1];
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
                    s = s.replace('@k', k);
                    s = s.replace('@p', p);
                    s = s.replace('@v', noon.stringify(v, {
                        colors: colors
                    }));
                    if (args.format.indexOf('@o') >= 0) {
                        path.pop();
                        if (path.length) {
                            o = noon.stringify(get(data, path), {
                                colors: colors
                            });
                        } else {
                            o = noon.stringify(data, {
                                colors: colors
                            });
                        }
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
            for (j = 0, len1 = result.length; j < len1; j++) {
                path = result[j];
                o[path.join('.')] = get(data, path);
            }
            s = noon.stringify(o, {
                colors: colors
            });
            out(s);
        }
        if (!args.result) {
            return out('');
        }
    }
};

pipeMode = false;

pipeData = "";

process.stdin.on('readable', function() {
    var data, ref;
    pipeMode = true;
    if (data = (ref = process.stdin.read()) != null ? ref.toString('utf8') : void 0) {
        return pipeData += data;
    }
});

process.stdin.on('end', function() {
    var data, ref, ref1;
    if (args.file === 'package.json') {
        delete args.file;
    }
    if ((args.value == null) && (args.key == null) && (args.path == null)) {
        args.path = args.file;
        args.result = true;
    }
    delete args.file;
    if ((ref = pipeData.trim()[0]) === '{' || ref === '[') {
        extname = '.json';
    } else {
        extname = '.noon';
    }
    outext = (ref1 = args.output) != null ? ref1 : extname;
    data = (function() {
        switch (extname) {
            case '.json':
                return JSON.parse(pipeData);
            default:
                return noon.parse(pipeData);
        }
    })();
    return handleData(data);
});

getExtname = function() {
    var ref;
    extname = args.json ? '.json' : args.noon ? '.noon' : args.file ? slash.extname(args.file) : '.json';
    if (indexOf.call(noon.extnames, extname) < 0) {
        console.error("unknown file type: " + (bold(yellow(extname))) + ". use --json or --noon to force type.");
    }
    outext = extname;
    if (ref = args.output, indexOf.call(noon.extnames, ref) >= 0) {
        outext = args.output;
        return delete args.output;
    }
};

startFileSearch = function() {
    var argsFile, file, i, len, ref;
    if (pipeMode) {
        return;
    }
    if (args.file == null) {
        if (fs.existsSync('./package.json')) {
            args.file = './package.json';
        } else if (fs.existsSync('./package.noon')) {
            args.file = './package.noon';
        } else {
            console.error('no input file provided!');
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
            console.error("can't find file: " + (bold(yellow(args.file))));
        }
    }
    getExtname();
    handleData(noon.load(args.file, extname));
    return process.exit(0);
};

setTimeout(startFileSearch, 1);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2RzLmpzIiwic291cmNlUm9vdCI6Ii4uL2NvZmZlZSIsInNvdXJjZXMiOlsic2RzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0FBQUEsSUFBQSw2SEFBQTtJQUFBOztBQVVBLElBQUEsR0FBUyxPQUFBLENBQVEsTUFBUjs7QUFDVCxLQUFBLEdBQVMsT0FBQSxDQUFRLE1BQVI7O0FBQ1QsRUFBQSxHQUFTLE9BQUEsQ0FBUSxJQUFSOztBQUNULElBQUEsR0FBUyxPQUFBLENBQVEsTUFBUjs7QUFDVCxJQUFBLEdBQVMsT0FBQSxDQUFRLFFBQVI7O0FBQ1QsS0FBQSxHQUFTLE9BQUEsQ0FBUSxNQUFSLENBQWUsQ0FBQzs7QUFDekIsS0FBSyxDQUFDLFNBQU4sQ0FBQTs7QUFRQSxJQUFBLEdBQU8sSUFBQSxDQUFLLHE2QkFBQSxHQTBCQyxDQUFDLE9BQUEsQ0FBVyxTQUFELEdBQVcsa0JBQXJCLENBQXVDLENBQUMsT0FBekMsQ0ExQk47O0FBbUNQLEtBQUEsR0FBUSxTQUFDLEdBQUQ7SUFDTCxPQUFBLENBQUMsR0FBRCxDQUFLLENBQUMsSUFBQSxHQUFLLEdBQUwsR0FBUyxJQUFWLENBQWUsQ0FBQyxHQUFyQjtXQUNDLE9BQU8sQ0FBQyxJQUFSLENBQUE7QUFGSTs7QUFJUixPQUFBLEdBQVU7O0FBQ1YsTUFBQSxHQUFVOztBQVFWLFVBQUEsR0FBYSxTQUFDLElBQUQ7QUFFVCxRQUFBO0lBQUEsV0FBRyxDQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBckIsS0FBOEIsT0FBOUIsSUFBQSxHQUFBLEtBQXNDLFFBQXpDO1FBQ0csT0FBQSxDQUFDLEtBQUQsQ0FBTyx3QkFBQSxHQUF3QixDQUFDLElBQUEsQ0FBSyxNQUFBLENBQU8sSUFBUCxDQUFMLENBQUQsQ0FBL0IsRUFESDs7SUFTQSxNQUFBLEdBQVMsSUFBSSxDQUFDO0lBQ2QsSUFBa0IscUJBQUEsSUFBZ0IsSUFBSSxDQUFDLElBQXZDO1FBQUEsTUFBQSxHQUFTLE1BQVQ7O0lB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QUE7SUFBQSxJQUFVLFFBQVY7QUFBQSxlQUFBOztJQUVBLElBQU8saUJBQVA7UUFDSSxJQUFHLEVBQUUsQ0FBQyxVQUFILENBQWMsZ0JBQWQsQ0FBSDtZQUNJLElBQUksQ0FBQyxJQUFMLEdBQVksaUJBRGhCO1NBQUEsTUFFSyxJQUFHLEVBQUUsQ0FBQyxVQUFILENBQWMsZ0JBQWQsQ0FBSDtZQUNELElBQUksQ0FBQyxJQUFMLEdBQVksaUJBRFg7U0FBQSxNQUFBO1lBR0YsT0FBQSxDQUFDLEtBQUQsQ0FBTyx5QkFBUCxFQUhFO1NBSFQ7S0FBQSxNQU9LLElBQUcsQ0FBSSxFQUFFLENBQUMsVUFBSCxDQUFjLElBQUksQ0FBQyxJQUFuQixDQUFQO1FBQ0QsUUFBQSxHQUFXLElBQUksQ0FBQztRQUNoQixJQUFJLG9CQUFELElBQWtCLGtCQUFsQixJQUFpQyxtQkFBcEM7QUFDSTtBQUFBLGlCQUFBLHFDQUFBOztnQkFDSSxJQUFHLEVBQUUsQ0FBQyxVQUFILENBQWMsSUFBZCxDQUFIO29CQUNJLElBQUksQ0FBQyxNQUFMLEdBQWM7b0JBQ2QsSUFBSSxDQUFDLElBQUwsR0FBYztvQkFDZCxJQUFJLENBQUMsSUFBTCxHQUFjO0FBQ2QsMEJBSko7O0FBREosYUFESjs7UUFPQSxJQUFHLFFBQUEsS0FBWSxJQUFJLENBQUMsSUFBcEI7WUFDRyxPQUFBLENBQUMsS0FBRCxDQUFPLG1CQUFBLEdBQW1CLENBQUMsSUFBQSxDQUFLLE1BQUEsQ0FBTyxJQUFJLENBQUMsSUFBWixDQUFMLENBQUQsQ0FBMUIsRUFESDtTQVRDOztJQVlMLFVBQUEsQ0FBQTtJQUVBLFVBQUEsQ0FBVyxJQUFJLENBQUMsSUFBTCxDQUFVLElBQUksQ0FBQyxJQUFmLEVBQXFCLE9BQXJCLENBQVg7V0FDQSxPQUFPLENBQUMsSUFBUixDQUFhLENBQWI7QUExQmM7O0FBNEJsQixVQUFBLENBQVcsZUFBWCxFQUE0QixDQUE1QiIsInNvdXJjZXNDb250ZW50IjpbIiMjI1xuIDAwMDAwMDAgIDAwMDAwMDAgICAgIDAwMDAwMDBcbjAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgICAgXG4wMDAwMDAwICAgMDAwICAgMDAwICAwMDAwMDAwIFxuICAgICAwMDAgIDAwMCAgIDAwMCAgICAgICAwMDBcbjAwMDAwMDAgICAwMDAwMDAwICAgIDAwMDAwMDAgXG4jIyNcblxuIyDilrhzdGFydCAnc2RzJ1xuXG5ub29uICAgPSByZXF1aXJlICdub29uJ1xuc2xhc2ggID0gcmVxdWlyZSAncGF0aCdcbmZzICAgICA9IHJlcXVpcmUgJ2ZzJ1xua2FyZyAgID0gcmVxdWlyZSAna2FyZydcbmZpbmQgICA9IHJlcXVpcmUgJy4vZmluZCdcbmtvbG9yICA9IHJlcXVpcmUoJ2tsb3InKS5rb2xvclxua29sb3IuZ2xvYmFsaXplKClcblxuIyAgMDAwMDAwMCAgIDAwMDAwMDAwICAgIDAwMDAwMDAgICAgMDAwMDAwMFxuIyAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgICAwMDAgICAgIFxuIyAwMDAwMDAwMDAgIDAwMDAwMDAgICAgMDAwICAwMDAwICAwMDAwMDAwIFxuIyAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAgICAgIDAwMFxuIyAwMDAgICAwMDAgIDAwMCAgIDAwMCAgIDAwMDAwMDAgICAwMDAwMDAwIFxuXG5hcmdzID0ga2FyZyBcIlwiXCJcbnNkc1xuICAgIGZpbGUgICAgICAgIC4gPyB0aGUgZmlsZSB0byBzZWFyY2ggaW4gICAgICAgICAgIC4gKiAgIC4gPSBwYWNrYWdlLmpzb25cbiAgICBrZXkgICAgICAgICAuID8ga2V5IHRvIHNlYXJjaCAgICAgICAgICAgIFxuICAgIHZhbHVlICAgICAgIC4gPyB2YWx1ZSB0byBzZWFyY2hcbiAgICBwYXRoICAgICAgICAuID8gcGF0aCB0byBzZWFyY2ggICAgICAgICAgIFxuICAgIGZvcm1hdCAgICAgIC4gPyByZXN1bHQgZm9ybWF0XG4gICAgc2V0ICAgICAgICAgLiA/IHNldCB2YWx1ZXMgXG4gICAgc2F2ZSAgICAgICAgLiA/IHdyaXRlIHJlc3VsdCBiYWNrIHRvIGlucHV0IGZpbGUgLiAtIFMgLiA9IGZhbHNlIFxuICAgIG91dHB1dCAgICAgIC4gPyB0aGUgZmlsZSB0byB3cml0ZSBvciBzdGRvdXQgICAgIC4gLSBGICAgICBcbiAgICBqc29uICAgICAgICAuID8gcGFyc2UgYXMganNvbiAgICAgICAgICAgICAgICAgICAgICAgICAuID0gZmFsc2VcbiAgICBub29uICAgICAgICAuID8gcGFyc2UgYXMgbm9vbiAgICAgICAgICAgICAgICAgICAgICAgICAuID0gZmFsc2VcbiAgICBvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuID0gZmFsc2VcbiAgICByZXN1bHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuID0gZmFsc2VcbiAgICBjb2xvcnMgICAgICAuID8gb3V0cHV0IHdpdGggYW5zaSBjb2xvcnMgICAgICAgICAgICAgICAuID0gZmFsc2VcbiAgICBcbmZvcm1hdFxuICAgIEBrICBrZXlcbiAgICBAdiAgdmFsdWVcbiAgICBAbyAgb2JqZWN0XG4gICAgQHAgIHBhdGhcbiAgICAgICAgXG5zaG9ydGN1dHMgXG4gICAgLW8gIGZvciAtZiBAb1xuICAgIC1yICBmb3IgLWYgQHYgYW5kIG5vIGxlYWRpbmcgZW1wdHkgbGluZVxuXG52ZXJzaW9uICAgICAje3JlcXVpcmUoXCIje19fZGlybmFtZX0vLi4vcGFja2FnZS5qc29uXCIpLnZlcnNpb259XG5cIlwiXCJcblxuIyAwMDAwMDAwMCAgMDAwMDAwMDAgICAwMDAwMDAwMCAgICAwMDAwMDAwICAgMDAwMDAwMDAgXG4jIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDBcbiMgMDAwMDAwMCAgIDAwMDAwMDAgICAgMDAwMDAwMCAgICAwMDAgICAwMDAgIDAwMDAwMDAgIFxuIyAwMDAgICAgICAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwXG4jIDAwMDAwMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgIDAwMDAwMDAgICAwMDAgICAwMDBcblxuZXJyb3IgPSAobXNnKSAtPlxuICAgIGxvZyAoXCJcXG5cIittc2crXCJcXG5cIikucmVkXG4gICAgcHJvY2Vzcy5leGl0KClcbiAgICBcbmV4dG5hbWUgPSAnJ1xub3V0ZXh0ICA9ICcnXG4gICAgXG4jIDAwMCAgIDAwMCAgIDAwMDAwMDAgICAwMDAgICAwMDAgIDAwMDAwMDAgICAgMDAwICAgICAgMDAwMDAwMDAgIDAwMDAwMDAgICAgIDAwMDAwMDAgICAwMDAwMDAwMDAgICAwMDAwMDAwICAgXG4jIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAwICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAgICAwMDAgICAgIDAwMCAgIDAwMCAgXG4jIDAwMDAwMDAwMCAgMDAwMDAwMDAwICAwMDAgMCAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgMDAwMDAwMDAwICAgICAwMDAgICAgIDAwMDAwMDAwMCAgXG4jIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgIDAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAgICAwMDAgICAgIDAwMCAgIDAwMCAgXG4jIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMDAwMDAgICAgMDAwMDAwMCAgMDAwMDAwMDAgIDAwMDAwMDAgICAgMDAwICAgMDAwICAgICAwMDAgICAgIDAwMCAgIDAwMCAgXG5cbmhhbmRsZURhdGEgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgIFxuICAgIGlmIG5vdCBkYXRhLmNvbnN0cnVjdG9yLm5hbWUgaW4gWydBcnJheScgJ09iamVjdCddXG4gICAgICAgIGVycm9yIFwibm8gc3RydWN0dXJlIGluIGRhdGE6ICN7Ym9sZCB5ZWxsb3cgZGF0YX1cIlxuICAgIFxuICAgICMgIDAwMDAwMDAgICAwMDAgICAwMDAgIDAwMDAwMDAwMFxuICAgICMgMDAwICAgMDAwICAwMDAgICAwMDAgICAgIDAwMCAgIFxuICAgICMgMDAwICAgMDAwICAwMDAgICAwMDAgICAgIDAwMCAgIFxuICAgICMgMDAwICAgMDAwICAwMDAgICAwMDAgICAgIDAwMCAgIFxuICAgICMgIDAwMDAwMDAgICAgMDAwMDAwMCAgICAgIDAwMCAgIFxuICAgIFxuICAgIGNvbG9ycyA9IGFyZ3MuY29sb3JzXG4gICAgY29sb3JzID0gZmFsc2UgaWYgYXJncy5vdXRwdXQ/IG9yIGFyZ3Muc2F2ZVxuICAgIFxuICAgIG91dCA9IChzKSAtPlxuICAgICAgICBcbiAgICAgICAgb3V0ZmlsZSA9IGFyZ3Mub3V0cHV0ID8gKGFyZ3MuZmlsZSBpZiBhcmdzLnNhdmUpXG4gICAgICAgIFxuICAgICAgICBpZiBvdXRmaWxlP1xuICAgICAgICAgICAgZnMubWtkaXJTeW5jIHNsYXNoLmRpcm5hbWUob3V0ZmlsZSksIHJlY3Vyc2l2ZTp0cnVlXG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICBmcy53cml0ZUZpbGUgb3V0ZmlsZSwgcywgJ3V0ZjgnLCAoZXJyKSAtPlxuICAgICAgICAgICAgICAgICAgICBpZiBlcnJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yIFwiY2FuJ3Qgd3JpdGUgI3tib2xkIHllbGxvdyBvdXRmaWxlfTogI3tlcnJ9XCJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nIGdyYXkgXCJ3cm90ZSAje2JvbGQgd2hpdGUgb3V0ZmlsZX1cIlxuICAgICAgICAgICAgY2F0Y2ggZXJyXG4gICAgICAgICAgICAgICAgZXJyb3IgXCJjYW4ndCB3cml0ZSAje2JvbGQgeWVsbG93IG91dGZpbGV9OiAje2Vycn1cIlxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBsb2cgc1xuICAgIFxuICAgIGlmIGFyZ3Muc2V0P1xuICAgICAgICBcbiAgICAgICAgIyAgMDAwMDAwMCAgMDAwMDAwMDAgIDAwMDAwMDAwMFxuICAgICAgICAjIDAwMCAgICAgICAwMDAgICAgICAgICAgMDAwICAgXG4gICAgICAgICMgMDAwMDAwMCAgIDAwMDAwMDAgICAgICAwMDAgICBcbiAgICAgICAgIyAgICAgIDAwMCAgMDAwICAgICAgICAgIDAwMCAgIFxuICAgICAgICAjIDAwMDAwMDAgICAwMDAwMDAwMCAgICAgMDAwICAgXG4gICAgICAgIFxuICAgICAgICBzZXQgPSByZXF1aXJlICcuL3NldCdcbiAgICAgICAgXG4gICAgICAgIGZvciBwLHYgb2Ygbm9vbi5wYXJzZSBhcmdzLnNldFxuICAgICAgICAgICAgc2V0IGRhdGEsIHAsIHZcbiAgICAgICAgICAgIFxuICAgICAgICBvdXQgbm9vbi5zdHJpbmdpZnkgZGF0YSwgY29sb3JzOmNvbG9ycywgZXh0Om91dGV4dFxuICAgICAgICAgICAgXG4gICAgZWxzZSBpZiBub3QgYXJncy5rZXk/IGFuZCBub3QgYXJncy52YWx1ZT8gYW5kIG5vdCBhcmdzLnBhdGg/XG4gICAgXG4gICAgICAgICMgMDAwICAgICAgMDAwICAgMDAwMDAwMCAgMDAwMDAwMDAwXG4gICAgICAgICMgMDAwICAgICAgMDAwICAwMDAgICAgICAgICAgMDAwICAgXG4gICAgICAgICMgMDAwICAgICAgMDAwICAwMDAwMDAwICAgICAgMDAwICAgXG4gICAgICAgICMgMDAwICAgICAgMDAwICAgICAgIDAwMCAgICAgMDAwICAgXG4gICAgICAgICMgMDAwMDAwMCAgMDAwICAwMDAwMDAwICAgICAgMDAwICAgXG4gICAgICAgIFxuICAgICAgICBzID0gbm9vbi5zdHJpbmdpZnkgZGF0YSwgY29sb3JzOmNvbG9ycywgZXh0Om91dGV4dFxuICAgICAgICBvdXQgJ1xcbicrcysnXFxuJ1xuICAgICAgICBcbiAgICBlbHNlICAgICAgXG4gICAgICAgIFxuICAgICAgICAjICAwMDAwMDAwICAwMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAwMDAwMCAgICAwMDAwMDAwICAwMDAgICAwMDBcbiAgICAgICAgIyAwMDAgICAgICAgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgICAgMDAwICAgMDAwXG4gICAgICAgICMgMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAwMDAwMDAgIDAwMDAwMDAgICAgMDAwICAgICAgIDAwMDAwMDAwMFxuICAgICAgICAjICAgICAgMDAwICAwMDAgICAgICAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgICAgICAwMDAgICAwMDBcbiAgICAgICAgIyAwMDAwMDAwICAgMDAwMDAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAgMDAwMDAwMCAgMDAwICAgMDAwXG4gICAgICAgICAgXG4gICAgICAgIGdldCA9IHJlcXVpcmUgJy4vZ2V0J1xuICAgICAgICAgIFxuICAgICAgICBpZiBub3QgYXJncy5yZXN1bHRcbiAgICAgICAgICAgIGxvZyAnJ1xuICAgICAgICAgICAgXG4gICAgICAgIHJlc3VsdCA9IFxuICAgICAgICAgICAgaWYgYXJncy5wYXRoPyBhbmQgYXJncy52YWx1ZT9cbiAgICAgICAgICAgICAgICBmaW5kLnBhdGhWYWx1ZSBkYXRhLCBhcmdzLnBhdGgsIGFyZ3MudmFsdWVcbiAgICAgICAgICAgIGVsc2UgaWYgYXJncy5wYXRoP1xuICAgICAgICAgICAgICAgIGZpbmQucGF0aCBkYXRhLCBhcmdzLnBhdGhcbiAgICAgICAgICAgIGVsc2UgaWYgYXJncy5rZXk/IGFuZCBhcmdzLnZhbHVlP1xuICAgICAgICAgICAgICAgIGZpbmQua2V5VmFsdWUgZGF0YSwgYXJncy5rZXksIGFyZ3MudmFsdWVcbiAgICAgICAgICAgIGVsc2UgaWYgYXJncy5rZXk/XG4gICAgICAgICAgICAgICAgZmluZC5rZXkgZGF0YSwgYXJncy5rZXlcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBmaW5kLnZhbHVlIGRhdGEsIGFyZ3MudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICBpZiBhcmdzLm9iamVjdCBvciBhcmdzLnJlc3VsdCBvciBhcmdzLmZvcm1hdFxuICAgICAgICAgICAgZm9yIHBhdGggaW4gcmVzdWx0XG4gICAgICAgICAgICAgICAgcCA9IHBhdGguam9pbiAnLidcbiAgICAgICAgICAgICAgICBrID0gcGF0aFtwYXRoLmxlbmd0aC0xXVxuICAgICAgICAgICAgICAgIHYgPSBnZXQgZGF0YSwgcGF0aFxuICAgIFxuICAgICAgICAgICAgICAgIGlmIGFyZ3Mub2JqZWN0XG4gICAgICAgICAgICAgICAgICAgIHBhdGgucG9wKClcbiAgICAgICAgICAgICAgICAgICAgcyA9IG5vb24uc3RyaW5naWZ5IGdldChkYXRhLCBwYXRoKSwgY29sb3JzOmNvbG9yc1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgYXJncy5yZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgcyA9IG5vb24uc3RyaW5naWZ5IHYsIGNvbG9yczogY29sb3JzXG4gICAgICAgICAgICAgICAgZWxzZSBpZiBhcmdzLmZvcm1hdFxuICAgICAgICAgICAgICAgICAgICBzID0gYXJncy5mb3JtYXRcbiAgICAgICAgICAgICAgICAgICAgcyA9IHMucmVwbGFjZSAnQGsnLCBrXG4gICAgICAgICAgICAgICAgICAgIHMgPSBzLnJlcGxhY2UgJ0BwJywgcFxuICAgICAgICAgICAgICAgICAgICBzID0gcy5yZXBsYWNlICdAdicsIG5vb24uc3RyaW5naWZ5IHYsIGNvbG9yczpjb2xvcnNcbiAgICAgICAgICAgICAgICAgICAgaWYgYXJncy5mb3JtYXQuaW5kZXhPZignQG8nKSA+PSAwXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoLnBvcCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBwYXRoLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8gPSBub29uLnN0cmluZ2lmeSBnZXQoZGF0YSwgcGF0aCksIGNvbG9yczpjb2xvcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvID0gbm9vbi5zdHJpbmdpZnkgZGF0YSwgY29sb3JzOmNvbG9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgcyA9IHMucmVwbGFjZSAnQG8nLCBvXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBvID0ge31cbiAgICAgICAgICAgICAgICAgICAgb1twXSA9IHZcbiAgICAgICAgICAgICAgICAgICAgcyA9IG5vb24uc3RyaW5naWZ5IG8sIGNvbG9yczpjb2xvcnNcbiAgICAgICAgICAgICAgICBvdXQgc1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBvID0ge31cbiAgICAgICAgICAgIGZvciBwYXRoIGluIHJlc3VsdFxuICAgICAgICAgICAgICAgIG9bcGF0aC5qb2luKCcuJyldID0gZ2V0IGRhdGEsIHBhdGhcbiAgICAgICAgICAgIHMgPSBub29uLnN0cmluZ2lmeSBvLCBjb2xvcnM6Y29sb3JzXG4gICAgICAgICAgICBvdXQgc1xuICAgICAgICAgICAgXG4gICAgICAgIGlmIG5vdCBhcmdzLnJlc3VsdFxuICAgICAgICAgICAgb3V0ICcnXG5cbiMgMDAwMDAwMDAgICAwMDAgIDAwMDAwMDAwICAgMDAwMDAwMDAgIFxuIyAwMDAgICAwMDAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgICAgXG4jIDAwMDAwMDAwICAgMDAwICAwMDAwMDAwMCAgIDAwMDAwMDAgICBcbiMgMDAwICAgICAgICAwMDAgIDAwMCAgICAgICAgMDAwICAgICAgIFxuIyAwMDAgICAgICAgIDAwMCAgMDAwICAgICAgICAwMDAwMDAwMCAgXG5cbnBpcGVNb2RlID0gZmFsc2VcbnBpcGVEYXRhID0gXCJcIlxucHJvY2Vzcy5zdGRpbi5vbiAncmVhZGFibGUnIC0+XG4gICAgcGlwZU1vZGUgPSB0cnVlIFxuICAgIGlmIGRhdGEgPSBwcm9jZXNzLnN0ZGluLnJlYWQoKT8udG9TdHJpbmcgJ3V0ZjgnXG4gICAgICAgIHBpcGVEYXRhICs9IGRhdGFcbiAgICAgICAgXG5wcm9jZXNzLnN0ZGluLm9uICdlbmQnIC0+IFxuICAgIFxuICAgIGlmIGFyZ3MuZmlsZSA9PSAncGFja2FnZS5qc29uJyB0aGVuIGRlbGV0ZSBhcmdzLmZpbGUgXG4gICAgaWYgbm90IGFyZ3MudmFsdWU/IGFuZCBub3QgYXJncy5rZXk/IGFuZCBub3QgYXJncy5wYXRoP1xuICAgICAgICBhcmdzLnBhdGggPSBhcmdzLmZpbGVcbiAgICAgICAgYXJncy5yZXN1bHQgPSB0cnVlXG4gICAgZGVsZXRlIGFyZ3MuZmlsZVxuICAgIFxuICAgIGlmIHBpcGVEYXRhLnRyaW0oKVswXSBpbiBbJ3snJ1snXSB0aGVuIGV4dG5hbWUgPSAnLmpzb24nXG4gICAgZWxzZSBleHRuYW1lID0gJy5ub29uJ1xuICAgIG91dGV4dCA9IGFyZ3Mub3V0cHV0ID8gZXh0bmFtZVxuICAgIFxuICAgIGRhdGEgPSBzd2l0Y2ggZXh0bmFtZVxuICAgICAgICB3aGVuICcuanNvbicgdGhlbiBKU09OLnBhcnNlIHBpcGVEYXRhXG4gICAgICAgIGVsc2Ugbm9vbi5wYXJzZSBwaXBlRGF0YVxuICAgIFxuICAgIGhhbmRsZURhdGEgZGF0YVxuXG4jIDAwMDAwMDAwICAwMDAgIDAwMCAgICAgIDAwMDAwMDAwICBcbiMgMDAwICAgICAgIDAwMCAgMDAwICAgICAgMDAwICAgICAgIFxuIyAwMDAwMDAgICAgMDAwICAwMDAgICAgICAwMDAwMDAwICAgXG4jIDAwMCAgICAgICAwMDAgIDAwMCAgICAgIDAwMCAgICAgICBcbiMgMDAwICAgICAgIDAwMCAgMDAwMDAwMCAgMDAwMDAwMDAgIFxuXG5nZXRFeHRuYW1lID0gLT5cbiAgICBleHRuYW1lID0gICAgIFxuICAgICAgICBpZiAgICAgIGFyZ3MuanNvbiB0aGVuICcuanNvbidcbiAgICAgICAgZWxzZSBpZiBhcmdzLm5vb24gdGhlbiAnLm5vb24nXG4gICAgICAgIGVsc2UgaWYgYXJncy5maWxlIHRoZW4gc2xhc2guZXh0bmFtZSBhcmdzLmZpbGVcbiAgICAgICAgZWxzZSAgICAnLmpzb24nXG4gICAgICAgIFxuICAgIGlmIGV4dG5hbWUgbm90IGluIG5vb24uZXh0bmFtZXNcbiAgICAgICAgZXJyb3IgXCJ1bmtub3duIGZpbGUgdHlwZTogI3tib2xkIHllbGxvdyBleHRuYW1lfS4gdXNlIC0tanNvbiBvciAtLW5vb24gdG8gZm9yY2UgdHlwZS5cIlxuICAgIFxuICAgIG91dGV4dCA9IGV4dG5hbWVcbiAgICBpZiBhcmdzLm91dHB1dCBpbiBub29uLmV4dG5hbWVzXG4gICAgICAgIG91dGV4dCA9IGFyZ3Mub3V0cHV0XG4gICAgICAgIGRlbGV0ZSBhcmdzLm91dHB1dFxuXG5zdGFydEZpbGVTZWFyY2ggPSAtPlxuICAgIFxuICAgIHJldHVybiBpZiBwaXBlTW9kZVxuXG4gICAgaWYgbm90IGFyZ3MuZmlsZT9cbiAgICAgICAgaWYgZnMuZXhpc3RzU3luYyAnLi9wYWNrYWdlLmpzb24nXG4gICAgICAgICAgICBhcmdzLmZpbGUgPSAnLi9wYWNrYWdlLmpzb24nXG4gICAgICAgIGVsc2UgaWYgZnMuZXhpc3RzU3luYyAnLi9wYWNrYWdlLm5vb24nXG4gICAgICAgICAgICBhcmdzLmZpbGUgPSAnLi9wYWNrYWdlLm5vb24nXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGVycm9yICdubyBpbnB1dCBmaWxlIHByb3ZpZGVkISdcbiAgICBlbHNlIGlmIG5vdCBmcy5leGlzdHNTeW5jIGFyZ3MuZmlsZVxuICAgICAgICBhcmdzRmlsZSA9IGFyZ3MuZmlsZVxuICAgICAgICBpZiAhYXJncy52YWx1ZT8gYW5kICFhcmdzLmtleT8gYW5kICFhcmdzLnBhdGg/ICAgIFxuICAgICAgICAgICAgZm9yIGZpbGUgaW4gWycuL3BhY2thZ2UuanNvbicsICcuL3BhY2thZ2Uubm9vbiddXG4gICAgICAgICAgICAgICAgaWYgZnMuZXhpc3RzU3luYyBmaWxlXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MucmVzdWx0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBhcmdzLnBhdGggICA9IGFyZ3NGaWxlXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuZmlsZSAgID0gZmlsZVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICBpZiBhcmdzRmlsZSA9PSBhcmdzLmZpbGVcbiAgICAgICAgICAgIGVycm9yIFwiY2FuJ3QgZmluZCBmaWxlOiAje2JvbGQgeWVsbG93IGFyZ3MuZmlsZX1cIlxuICAgIFxuICAgIGdldEV4dG5hbWUoKVxuICAgICAgICAgICAgXG4gICAgaGFuZGxlRGF0YSBub29uLmxvYWQgYXJncy5maWxlLCBleHRuYW1lXG4gICAgcHJvY2Vzcy5leGl0IDBcbiAgICBcbnNldFRpbWVvdXQgc3RhcnRGaWxlU2VhcmNoLCAxXG5cbiMg4pa4ZW5kICdzZHMnXG4iXX0=
//# sourceURL=../coffee/sds.coffee