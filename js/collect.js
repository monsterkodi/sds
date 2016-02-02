
/*
 0000000   0000000   000      000      00000000   0000000  000000000
000       000   000  000      000      000       000          000   
000       000   000  000      000      0000000   000          000   
000       000   000  000      000      000       000          000   
 0000000   0000000   0000000  0000000  00000000   0000000     000
 */

(function() {
  var _, collect;

  _ = require('lodash');

  collect = function(node, filter, map, count, keyPath, result) {
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
    if (filter == null) {
      filter = function(p, k, v) {
        return true;
      };
    }
    if (map == null) {
      map = function(p, v) {
        return [p, v];
      };
    }
    switch (node.constructor.name) {
      case "Array":
        for (i = j = 0, ref = node.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          v = node[i];
          keyPath.push(i);
          if (filter(keyPath, i, v)) {
            result.push(map(_.clone(keyPath), v));
            if (count > 0 && result.length >= count) {
              return result;
            }
          }
          if ((ref1 = v != null ? v.constructor.name : void 0) === "Array" || ref1 === "Object") {
            collect(v, filter, map, count, keyPath, result);
          }
          keyPath.pop();
        }
        break;
      case "Object":
        for (k in node) {
          v = node[k];
          keyPath.push(k);
          if (filter(keyPath, k, v)) {
            result.push(map(_.clone(keyPath), v));
            if (count > 0 && result.length >= count) {
              return result;
            }
          }
          if ((ref2 = v != null ? v.constructor.name : void 0) === "Array" || ref2 === "Object") {
            collect(v, filter, map, count, keyPath, result);
          }
          keyPath.pop();
        }
    }
    return result;
  };

  module.exports = collect;

}).call(this);
