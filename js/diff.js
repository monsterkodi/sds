
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


    /*
    000000000  000   000   0000000 
       000     000 0 000  000   000
       000     000000000  000   000
       000     000   000  000   000
       000     00     00   0000000
     */

    diff.two = function(c, a) {
      var dac, dff, nac, pc0, sme, ta, tc, und;
      tc = this.traverse(c);
      ta = this.traverse(a);
      pc0 = function(x, y) {
        return x[0][0] === y[0][0];
      };
      nac = _.differenceWith(ta, tc, pc0);
      dac = _.differenceWith(tc, ta, pc0);
      und = _.unionWith(nac, dac, _.isEqual);
      sme = _.intersectionWith(tc, ta, _.isEqual);
      dff = _.unionWith(tc, ta, _.isEqual);
      dff = _.differenceWith(dff, und, sme, tc, _.isEqual);
      return {
        diff: this.sortpth(dff.map(function(t) {
          return [t[0], get(c, t[0]), t[1]];
        })),
        "new": this.sortpth(this.toplevel(nac)),
        same: this.sortpth(this.toplevel(sme)),
        del: this.sortpth(this.toplevel(dac))
      };
    };


    /*
    000000000  000   000  00000000   00000000  00000000
       000     000   000  000   000  000       000     
       000     000000000  0000000    0000000   0000000 
       000     000   000  000   000  000       000     
       000     000   000  000   000  00000000  00000000
     */

    diff.three = function(c, a, b) {
      var ab, ba, ca, cb, cha, chb, del, dff, dla, dlb, keq, sdf, sme, snw, ssm;
      ca = this.two(c, a);
      cb = this.two(c, b);
      ab = this.two(a, b);
      ba = this.two(b, a);
      keq = function(x, y) {
        return x[0][0] === y[0][0];
      };
      ssm = _.intersectionWith(ca.same, cb.same, _.isEqual);
      snw = _.unionWith(ca["new"], cb["new"], _.isEqual);
      snw = snw.filter(function(t) {
        var f, j, len, t2;
        f = 0;
        for (j = 0, len = snw.length; j < len; j++) {
          t2 = snw[j];
          if (t2[0][0] === t[0][0]) {
            f += 1;
          }
        }
        return f === 1;
      });
      sdf = _.intersectionWith(ca.diff, cb.diff, _.isEqual);
      cha = _.intersectionWith(cb.same, ca.diff, keq);
      chb = _.intersectionWith(ca.same, cb.diff, keq);
      cha = _.uniqWith(cha.map(function(t) {
        return [t[0], get(a, t[0])];
      }), _.isEqual);
      chb = _.uniqWith(chb.map(function(t) {
        return [t[0], get(b, t[0])];
      }), _.isEqual);
      sdf = sdf.map(function(t) {
        return [t[0], t[2]];
      });
      sme = _.unionWith(ssm, snw, sdf, cha, chb, _.isEqual);
      dff = _.unionWith(ca.diff, cb.diff, ca["new"], cb["new"], _.isEqual);
      dff = _.differenceWith(dff, sme, keq);
      dff = this.toplevel(dff);
      dff = dff.map(function(t) {
        return [t[0], get(a, t[0]), get(b, t[0])];
      });
      dff = _.uniqWith(dff, _.isEqual);
      dla = _.intersectionWith(ca.del, cb.same, _.isEqual);
      dlb = _.intersectionWith(cb.del, ca.same, _.isEqual);
      del = _.unionWith(dla, dlb, _.isEqual);
      return {
        c2a: ca,
        c2b: cb,
        a2b: ab,
        b2a: ba,
        same: this.sortpth(sme),
        diff: this.sortpth(dff),
        del: del
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


    /*
    000000000   0000000    0000000   000       0000000
       000     000   000  000   000  000      000     
       000     000   000  000   000  000      0000000 
       000     000   000  000   000  000           000
       000      0000000    0000000   0000000  0000000
     */

    diff.toplevel = function(l) {
      return l.filter(function(t) {
        return t[0].length === 1;
      });
    };

    diff.sortpth = function(l) {
      return l.sort(function(a, b) {
        var ap, bp;
        ap = a[0].join('.');
        bp = b[0].join('.');
        if (ap === bp) {
          return 0;
        } else if (ap > bp) {
          return 1;
        } else {
          return -1;
        }
      });
    };

    return diff;

  })();

  module.exports = diff;

}).call(this);
