
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
      tc = this.traverse(c);
      ta = this.traverse(a);
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

    diff.three = function(c, a, b) {
      var da, db;
      da = this.two(c, a);
      db = this.two(c, b);
      return {
        c2a: da,
        c2b: db
      };
    };


    /*
    000000000  00000000    0000000   000   000  00000000  00000000    0000000  00000000
       000     000   000  000   000  000   000  000       000   000  000       000     
       000     0000000    000000000   000 000   0000000   0000000    0000000   0000000 
       000     000   000  000   000     000     000       000   000       000  000     
       000     000   000  000   000      0      00000000  000   000  0000000   00000000
     */

    diff.traverse = function(node, count, keyPath, result) {
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
            result.push([_.clone(keyPath), v]);
            if (count > 0 && result.length >= count) {
              return result;
            }
            if ((ref1 = v != null ? v.constructor.name : void 0) === "Array" || ref1 === "Object") {
              this.traverse(v, count, keyPath, result);
            }
            keyPath.pop();
          }
          break;
        case "Object":
          for (k in node) {
            v = node[k];
            keyPath.push(k);
            result.push([_.clone(keyPath), v]);
            if (count > 0 && result.length >= count) {
              return result;
            }
            if ((ref2 = v != null ? v.constructor.name : void 0) === "Array" || ref2 === "Object") {
              this.traverse(v, count, keyPath, result);
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
