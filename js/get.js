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

  _ = require('lodash');

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWUvZ2V0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUFBOzs7Ozs7Ozs7OztBQUFBLE1BQUEsQ0FBQSxFQUFBOztFQVFBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7RUFPSixHQUFBLEdBQU0sUUFBQSxDQUFDLE1BQUQsRUFBUyxPQUFULEVBQWtCLFlBQWxCLENBQUE7QUFDRixRQUFBO0lBQUEsSUFBK0IsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxPQUFYLENBQS9CO01BQUEsT0FBQSxHQUFVLE9BQU8sQ0FBQyxLQUFSLENBQWMsR0FBZCxFQUFWOztJQUNBLEVBQUEsR0FBSyxDQUFDLENBQUMsS0FBRixDQUFRLE9BQVI7QUFDTCxXQUFNLEVBQUUsQ0FBQyxNQUFUO01BQ0ksTUFBQSxHQUFTLE1BQU8sQ0FBQSxFQUFFLENBQUMsS0FBSCxDQUFBLENBQUE7TUFDaEIsSUFBMkIsY0FBM0I7QUFBQSxlQUFPLGFBQVA7O0lBRko7V0FHQTtFQU5FOztFQVFOLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0FBdkJqQiIsInNvdXJjZXNDb250ZW50IjpbIiMjI1xuIDAwMDAwMDAgICAwMDAwMDAwMCAgMDAwMDAwMDAwXG4wMDAgICAgICAgIDAwMCAgICAgICAgICAwMDAgICBcbjAwMCAgMDAwMCAgMDAwMDAwMCAgICAgIDAwMCAgIFxuMDAwICAgMDAwICAwMDAgICAgICAgICAgMDAwICAgXG4gMDAwMDAwMCAgIDAwMDAwMDAwICAgICAwMDAgICBcbiMjI1xuXG5fID0gcmVxdWlyZSAnbG9kYXNoJ1xuXG4jIyNcbiMgYWNjZXB0cyBhbiBvYmplY3QgYW5kIGEga2V5cGF0aCBhcyBhIGxpc3Qgb3Igc3RyaW5nIGFuZCBhIHZhbHVlXG4jIHJldHVybnMgdGhlIHZhbHVlIGF0IGtleXBhdGggb3IgdW5kZWZpbmVkXG4jIyNcblxuZ2V0ID0gKG9iamVjdCwga2V5cGF0aCwgZGVmYXVsdFZhbHVlKSAtPlxuICAgIGtleXBhdGggPSBrZXlwYXRoLnNwbGl0ICcuJyBpZiBfLmlzU3RyaW5nIGtleXBhdGhcbiAgICBrcCA9IF8uY2xvbmUga2V5cGF0aFxuICAgIHdoaWxlIGtwLmxlbmd0aFxuICAgICAgICBvYmplY3QgPSBvYmplY3Rba3Auc2hpZnQoKV1cbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZSBpZiBub3Qgb2JqZWN0P1xuICAgIG9iamVjdFxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFxuIl19
//# sourceURL=C:/Users/kodi/s/sds/coffee/get.coffee