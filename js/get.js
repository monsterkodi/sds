
/*
 0000000   00000000  000000000
000        000          000   
000  0000  0000000      000   
000   000  000          000   
 0000000   00000000     000
 */

(function() {
  var _, get;

  _ = require('lodash');


  /*
   * accepts an object and a keypath as a list or string and a value
   * returns the value at keypath or undefined
   */

  get = function(object, keypath) {
    var kp;
    if (_.isString(keypath)) {
      keypath = keypath.split('.');
    }
    kp = _.clone(keypath);
    while (kp.length) {
      object = object[kp.shift()];
      if (object === null) {
        return null;
      }
      if (object == null) {
        return void 0;
      }
    }
    return object;
  };

  module.exports = get;

}).call(this);
