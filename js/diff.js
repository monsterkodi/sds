
/*
0000000    000  00000000  00000000
000   000  000  000       000     
000   000  000  000000    000000  
000   000  000  000       000     
0000000    000  000       000
 */

(function() {
  var _, collect, diff, get, log, noon, regexp, sortpath, tools, toplevel;

  _ = require('lodash');

  collect = require('./collect');

  regexp = require('./regexp');

  get = require('./get');

  tools = require('./tools');

  noon = require('noon');

  log = console.log;

  toplevel = tools.toplevel;

  sortpath = tools.sortpath;

  diff = (function() {
    function diff() {}


    /*
    000000000  000   000   0000000 
       000     000 0 000  000   000
       000     000000000  000   000
       000     000   000  000   000
       000     00     00   0000000
     */


    /*
     * accepts two objects a and b
     * returns an object
     *
     *   diff: [ list of [keypath, value_a, value_b] for changed values      ]
     *   same: [ list of [keypath, value]            for unchanged values    ]
     *   new:  [ list of [keypath, value_b]          for new values in b     ]
     *   del:  [ list of [keypath, value_a]          for values deleted in b ]
     *
     * the diff list might contain changes at keypath.length > 1
     */

    diff.two = function(c, a) {
      var dac, dff, nac, pc0, sme, ta, tc, und;
      tc = collect(c);
      ta = collect(a);
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
        diff: sortpath(dff.map(function(t) {
          return [t[0], get(c, t[0]), t[1]];
        })),
        "new": sortpath(toplevel(nac)),
        same: sortpath(toplevel(sme)),
        del: sortpath(toplevel(dac))
      };
    };


    /*
    000000000  000   000  00000000   00000000  00000000
       000     000   000  000   000  000       000     
       000     000000000  0000000    0000000   0000000 
       000     000   000  000   000  000       000     
       000     000   000  000   000  00000000  00000000
     */


    /*
     * accepts three objects c, a and b
     * returns an object
     *
     *   diff: [ list of [keypath, value_a, value_b] for conflicting values in a and b   ]
     *   del:  [ list of [keypath, value_c]          for unproblematic deleted in a and or b ]
     *   same: [ list of [keypath, value]            for unproblematic values in a and b ]
     *
     *   unproblematic:
     *         values: same in a and b or only new in a or only new in b
     *         deleted: deleted in both a and b or deleted in one and unchanged between c and the other
     *
     *   some intermediate results are included as well...
     * 
     *   c2a:  changes between c and a
     *   c2b:  changes between c and b
     *   a2b:  changes between a and b
     *   b2a:  changes between b and a
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
        var f, i, len, t2;
        f = 0;
        for (i = 0, len = snw.length; i < len; i++) {
          t2 = snw[i];
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
      dff = toplevel(dff);
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
        same: sortpath(sme),
        diff: sortpath(dff),
        del: del
      };
    };

    return diff;

  })();

  module.exports = diff;

}).call(this);
