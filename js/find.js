
/*
00000000  000  000   000  0000000  
000       000  0000  000  000   000
000000    000  000 0 000  000   000
000       000  000  0000  000   000
000       000  000   000  0000000
 */

(function() {
  var _, collect, find, regexp;

  _ = require('lodash');

  regexp = require('./regexp');

  collect = require('./collect');

  find = (function() {
    function find() {}

    find.key = function(node, key) {
      var keyReg;
      keyReg = this.reg(key);
      return this.traverse(node, (function(_this) {
        return function(p, k, v) {
          return _this.match(k, keyReg);
        };
      })(this));
    };

    find.path = function(node, path) {
      var pthReg;
      pthReg = this.reg(path);
      return this.traverse(node, (function(_this) {
        return function(p, k, v) {
          return _this.matchPath(p, pthReg);
        };
      })(this));
    };

    find.value = function(node, val) {
      var valReg;
      valReg = this.reg(val);
      return this.traverse(node, (function(_this) {
        return function(p, k, v) {
          return _this.match(v, valReg);
        };
      })(this));
    };

    find.keyValue = function(node, key, val) {
      var keyReg, valReg;
      keyReg = this.reg(key);
      valReg = this.reg(val);
      return this.traverse(node, (function(_this) {
        return function(p, k, v) {
          return _this.match(k, keyReg) && _this.match(v, valReg);
        };
      })(this));
    };

    find.pathValue = function(node, path, val) {
      var pthReg, valReg;
      pthReg = this.reg(path);
      valReg = this.reg(val);
      return this.traverse(node, (function(_this) {
        return function(p, k, v) {
          return _this.matchPath(p, pthReg) && _this.match(v, valReg);
        };
      })(this));
    };


    /*
    00     00   0000000   000000000   0000000  000   000
    000   000  000   000     000     000       000   000
    000000000  000000000     000     000       000000000
    000 0 000  000   000     000     000       000   000
    000   000  000   000     000      0000000  000   000
     */

    find.matchPath = function(a, r) {
      return this.match(a.join('.'), r);
    };

    find.match = function(a, r) {
      var ref;
      if (!_.isArray(a)) {
        return (ref = String(a).match(r)) != null ? ref.length : void 0;
      } else {
        return false;
      }
    };


    /*
    00000000   00000000   0000000 
    000   000  000       000      
    0000000    0000000   000  0000
    000   000  000       000   000
    000   000  00000000   0000000
     */

    find.reg = function(s) {
      return regexp(s);
    };


    /*
    000000000  00000000    0000000   000   000  00000000  00000000    0000000  00000000
       000     000   000  000   000  000   000  000       000   000  000       000     
       000     0000000    000000000   000 000   0000000   0000000    0000000   0000000 
       000     000   000  000   000     000     000       000   000       000  000     
       000     000   000  000   000      0      00000000  000   000  0000000   00000000
     */

    find.traverse = function(node, func) {
      return collect(node, func, function(p, v) {
        return p;
      });
    };

    return find;

  })();

  module.exports = find;

}).call(this);
