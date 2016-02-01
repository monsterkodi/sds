
/*
0000000    000  00000000  00000000
000   000  000  000       000     
000   000  000  000000    000000  
000   000  000  000       000     
0000000    000  000       000
 */

(function() {
  var _, diff, get, log, noon, regexp;

  _ = require('lodash');

  regexp = require('./regexp');

  get = require('./get');

  noon = require('noon');

  log = console.log;

  diff = (function() {
    function diff() {}

    diff.two = function(c, a) {
      var dac, dca, pc0, rst, ta, tc, uac, udd;
      tc = this.traverse(c, function() {
        return true;
      });
      ta = this.traverse(a, function() {
        return true;
      });
      pc0 = function(x, y) {
        return x[0][0] === y[0][0];
      };
      dac = _.differenceWith(ta, tc, pc0);
      dca = _.differenceWith(tc, ta, pc0);
      udd = _.unionWith(dac, dca, _.isEqual);
      uac = _.intersectionWith(tc, ta, _.isEqual);
      rst = _.unionWith(tc, ta, _.isEqual);
      rst = _.differenceWith(rst, udd, _.isEqual);
      rst = _.differenceWith(rst, uac, _.isEqual);
      rst = _.differenceWith(rst, tc, _.isEqual);
      return {
        diff: rst.map(function(t) {
          return [t[0], get(c, t[0]), t[1]];
        }),
        "new": dac.filter(function(t) {
          return t[0].length === 1;
        }),
        same: uac.filter(function(t) {
          return t[0].length === 1;
        }),
        del: dca.filter(function(t) {
          return t[0].length === 1;
        })
      };
    };

    diff.three = function(a, b, c) {
      var comp, da, db;
      da = this.two(c, a);
      db = this.two(c, b);
      log('ta'.red, ta);
      log('tb'.green, tb);
      log('tc'.magenta, tc);
      comp = function(x, y) {
        return x[0][0] === y[0][0];
      };
      log("diff a b".red, _.differenceWith(ta, tb, comp));
      log("diff a c".red, _.differenceWith(ta, tc, comp));
      log("diff b c".red, _.differenceWith(tb, tc, comp));
      log("diff a b c".yellow, _.differenceWith(ta, tb, tc, comp));
      log("union a b".red, _.unionWith(ta, tb, comp));
      log("union a c".red, _.unionWith(ta, tc, comp));
      log("union b c".red, _.unionWith(tb, tc, comp));
      log("union a b c".yellow, _.unionWith(ta, tb, tc, comp));
      return {
        a: {
          "new": ['o', 't', 'u'],
          changed: ['p', 'r', 's'],
          del: ['v']
        },
        b: {
          "new": ['t', 'u'],
          changed: ['p', 'r', 's'],
          del: ['v', 'z']
        }
      };
    };


    /*
    000000000  00000000    0000000   000   000  00000000  00000000    0000000  00000000
       000     000   000  000   000  000   000  000       000   000  000       000     
       000     0000000    000000000   000 000   0000000   0000000    0000000   0000000 
       000     000   000  000   000     000     000       000   000       000  000     
       000     000   000  000   000      0      00000000  000   000  0000000   00000000
     */

    diff.traverse = function(node, func, count, keyPath, result) {
      var i, j, k, ref, ref1, ref2, v;
      if (count == null) {
        count = -1;
      }
      if (keyPath == null) {
        keyPath = [];
      }
      if (result == null) {
        result = [];
      }
      switch (node.constructor.name) {
        case "Array":
          for (i = j = 0, ref = node.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
            v = node[i];
            keyPath.push(i);
            if (func(keyPath, i, v)) {
              result.push([_.clone(keyPath), v]);
              if (count > 0 && result.length >= count) {
                return result;
              }
            }
            if ((ref1 = v != null ? v.constructor.name : void 0) === "Array" || ref1 === "Object") {
              this.traverse(v, func, count, keyPath, result);
            }
            keyPath.pop();
          }
          break;
        case "Object":
          for (k in node) {
            v = node[k];
            keyPath.push(k);
            if (func(keyPath, k, v)) {
              result.push([_.clone(keyPath), v]);
              if (count > 0 && result.length >= count) {
                return result;
              }
            }
            if ((ref2 = v != null ? v.constructor.name : void 0) === "Array" || ref2 === "Object") {
              this.traverse(v, func, count, keyPath, result);
            }
            keyPath.pop();
          }
      }
      return result;
    };

    return diff;

  })();

  module.exports = diff;

}).call(this);
