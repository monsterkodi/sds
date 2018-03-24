(function() {
  /*
   0000000   00000000  000000000
  000        000          000   
  000  0000  0000000      000   
  000   000  000          000   
   0000000   00000000     000   
  */
  /*
   * accepts an object and a keypath as a list or string and a value
   * returns the value at keypath or undefined
   */
  var _, get;

  ({_} = require('kxk'));

  get = function(object, keypath, defaultValue) {
    var kp;
    if (_.isString(keypath)) {
      keypath = keypath.split('.');
    }
    kp = _.clone(keypath);
    while (kp.length) {
      object = object[kp.shift()];
      if (object == null) {
        return defaultValue;
      }
    }
    return object;
  };

  module.exports = get;

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWUvZ2V0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUFBOzs7Ozs7Ozs7OztBQUFBLE1BQUEsQ0FBQSxFQUFBOztFQVFBLENBQUEsQ0FBRSxDQUFGLENBQUEsR0FBUSxPQUFBLENBQVEsS0FBUixDQUFSOztFQU9BLEdBQUEsR0FBTSxRQUFBLENBQUMsTUFBRCxFQUFTLE9BQVQsRUFBa0IsWUFBbEIsQ0FBQTtBQUNGLFFBQUE7SUFBQSxJQUErQixDQUFDLENBQUMsUUFBRixDQUFXLE9BQVgsQ0FBL0I7TUFBQSxPQUFBLEdBQVUsT0FBTyxDQUFDLEtBQVIsQ0FBYyxHQUFkLEVBQVY7O0lBQ0EsRUFBQSxHQUFLLENBQUMsQ0FBQyxLQUFGLENBQVEsT0FBUjtBQUNMLFdBQU0sRUFBRSxDQUFDLE1BQVQ7TUFDSSxNQUFBLEdBQVMsTUFBTyxDQUFBLEVBQUUsQ0FBQyxLQUFILENBQUEsQ0FBQTtNQUNoQixJQUEyQixjQUEzQjtBQUFBLGVBQU8sYUFBUDs7SUFGSjtXQUdBO0VBTkU7O0VBUU4sTUFBTSxDQUFDLE9BQVAsR0FBaUI7QUF2QmpCIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXG4gMDAwMDAwMCAgIDAwMDAwMDAwICAwMDAwMDAwMDBcbjAwMCAgICAgICAgMDAwICAgICAgICAgIDAwMCAgIFxuMDAwICAwMDAwICAwMDAwMDAwICAgICAgMDAwICAgXG4wMDAgICAwMDAgIDAwMCAgICAgICAgICAwMDAgICBcbiAwMDAwMDAwICAgMDAwMDAwMDAgICAgIDAwMCAgIFxuIyMjXG5cbnsgXyB9ID0gcmVxdWlyZSAna3hrJ1xuXG4jIyNcbiMgYWNjZXB0cyBhbiBvYmplY3QgYW5kIGEga2V5cGF0aCBhcyBhIGxpc3Qgb3Igc3RyaW5nIGFuZCBhIHZhbHVlXG4jIHJldHVybnMgdGhlIHZhbHVlIGF0IGtleXBhdGggb3IgdW5kZWZpbmVkXG4jIyNcblxuZ2V0ID0gKG9iamVjdCwga2V5cGF0aCwgZGVmYXVsdFZhbHVlKSAtPlxuICAgIGtleXBhdGggPSBrZXlwYXRoLnNwbGl0ICcuJyBpZiBfLmlzU3RyaW5nIGtleXBhdGhcbiAgICBrcCA9IF8uY2xvbmUga2V5cGF0aFxuICAgIHdoaWxlIGtwLmxlbmd0aFxuICAgICAgICBvYmplY3QgPSBvYmplY3Rba3Auc2hpZnQoKV1cbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZSBpZiBub3Qgb2JqZWN0P1xuICAgIG9iamVjdFxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFxuIl19
//# sourceURL=C:/Users/kodi/s/sds/coffee/get.coffee