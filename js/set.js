
/*
 0000000  00000000  000000000
000       000          000   
0000000   0000000      000   
     000  000          000   
0000000   00000000     000
 */

(function() {
  var _, set;

  _ = require('lodash');


  /*
   * accepts an object, a keypath as an array or string and a value
   * returns the object with value set at keypath
   */

  set = function(object, keypath, value) {
    var k, kp, o;
    if (_.isString(keypath)) {
      keypath = keypath.split('.');
    }
    if (!_.isArray(keypath)) {
      throw "invalid keypath: " + (JSON.stringify(keypath));
    }
    kp = _.clone(keypath);
    o = object;
    while (kp.length > 1) {
      k = kp.shift();
      if (o[k] == null) {
        if (!_.isNaN(_.parseInt(k))) {
          o = o[k] = [];
        } else {
          o = o[k] = {};
        }
      } else {
        o = o[k];
      }
    }
    if (kp.length === 1 && (o != null)) {
      o[kp[0]] = value;
      if (o[kp[0]] !== value) {
        throw "couldn't set value " + (JSON.stringify(value)) + " for keypath " + (keypath.join('.')) + " in " + (JSON.stringify(object));
      }
    }
    return object;
  };

  module.exports = set;

}).call(this);
