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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJqcy9nZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQTs7Ozs7Ozs7Ozs7QUFBQSxNQUFBLENBQUEsRUFBQTs7RUFRQSxDQUFBLENBQUUsQ0FBRixDQUFBLEdBQVEsT0FBQSxDQUFRLEtBQVIsQ0FBUjs7RUFPQSxHQUFBLEdBQU0sUUFBQSxDQUFDLE1BQUQsRUFBUyxPQUFULENBQUE7QUFDRixRQUFBO0lBQUEsSUFBK0IsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxPQUFYLENBQS9CO01BQUEsT0FBQSxHQUFVLE9BQU8sQ0FBQyxLQUFSLENBQWMsR0FBZCxFQUFWOztJQUNBLEVBQUEsR0FBSyxDQUFDLENBQUMsS0FBRixDQUFRLE9BQVI7QUFDTCxXQUFNLEVBQUUsQ0FBQyxNQUFUO01BQ0ksTUFBQSxHQUFTLE1BQU8sQ0FBQSxFQUFFLENBQUMsS0FBSCxDQUFBLENBQUE7TUFDaEIsSUFBZSxNQUFBLEtBQVUsSUFBekI7QUFBQSxlQUFPLEtBQVA7O01BQ0EsSUFBd0IsY0FBeEI7QUFBQSxlQUFPLE9BQVA7O0lBSEo7V0FJQTtFQVBFOztFQVNOLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0FBeEJqQiIsInNvdXJjZXNDb250ZW50IjpbIiMjI1xuIDAwMDAwMDAgICAwMDAwMDAwMCAgMDAwMDAwMDAwXG4wMDAgICAgICAgIDAwMCAgICAgICAgICAwMDAgICBcbjAwMCAgMDAwMCAgMDAwMDAwMCAgICAgIDAwMCAgIFxuMDAwICAgMDAwICAwMDAgICAgICAgICAgMDAwICAgXG4gMDAwMDAwMCAgIDAwMDAwMDAwICAgICAwMDAgICBcbiMjI1xuXG57IF8gfSA9IHJlcXVpcmUgJ2t4aydcblxuIyMjXG4jIGFjY2VwdHMgYW4gb2JqZWN0IGFuZCBhIGtleXBhdGggYXMgYSBsaXN0IG9yIHN0cmluZyBhbmQgYSB2YWx1ZVxuIyByZXR1cm5zIHRoZSB2YWx1ZSBhdCBrZXlwYXRoIG9yIHVuZGVmaW5lZFxuIyMjXG5cbmdldCA9IChvYmplY3QsIGtleXBhdGgpIC0+XG4gICAga2V5cGF0aCA9IGtleXBhdGguc3BsaXQgJy4nIGlmIF8uaXNTdHJpbmcga2V5cGF0aFxuICAgIGtwID0gXy5jbG9uZSBrZXlwYXRoXG4gICAgd2hpbGUga3AubGVuZ3RoXG4gICAgICAgIG9iamVjdCA9IG9iamVjdFtrcC5zaGlmdCgpXVxuICAgICAgICByZXR1cm4gbnVsbCBpZiBvYmplY3QgPT0gbnVsbCBcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZCBpZiBub3Qgb2JqZWN0P1xuICAgIG9iamVjdFxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFxuIl19
//# sourceURL=C:/Users/kodi/s/sds/coffee/get.coffee