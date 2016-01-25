
/*
0000000    000  00000000  00000000
000   000  000  000       000     
000   000  000  000000    000000  
000   000  000  000       000     
0000000    000  000       000
 */

(function() {
  var _, diff, regexp;

  _ = require('lodash');

  regexp = require('./regexp');

  diff = (function() {
    function diff() {}

    diff.three = function(a, b, c) {
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
              result.push(_.clone(keyPath, true));
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
              result.push(_.clone(keyPath, true));
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
