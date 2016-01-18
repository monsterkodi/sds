
/*
00000000   00000000   0000000   00000000  000   000  00000000 
000   000  000       000        000        000 000   000   000
0000000    0000000   000  0000  0000000     00000    00000000 
000   000  000       000   000  000        000 000   000      
000   000  00000000   0000000   00000000  000   000  000
 */

(function() {
  var regexp;

  regexp = function(s) {
    s = String(s);
    s = s.replace(/([^.]+\|[^.]+)/g, '($1)');
    s = s.replace(/\./g, '\\.');
    s = s.replace(/\^/g, '\\^');
    s = s.replace(/\?/g, '[^.]');
    s = s.replace(/\*\*/g, '####');
    s = s.replace(/\*/g, '[^.]*');
    s = s.replace(/####/g, '.*');
    return new RegExp("^" + s + "$");
  };

  module.exports = regexp;

}).call(this);
