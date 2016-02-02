
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

  get = function(node, keyPath) {
    var kp;
    kp = _.clone(keyPath);
    while (kp.length) {
      node = node[kp.shift()];
      if (node === null) {
        return null;
      }
      if (node == null) {
        return void 0;
      }
    }
    return node;
  };

  module.exports = get;

}).call(this);
