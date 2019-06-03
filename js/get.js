// koffee 0.56.0

/*
 0000000   00000000  000000000
000        000          000
000  0000  0000000      000
000   000  000          000
 0000000   00000000     000
 */
var _, get;

_ = require('lodash');


/*
 * accepts an object and a keypath as a list or string and a value
 * returns the value at keypath or undefined
 */

get = function(object, keypath, defaultValue) {
    var kp;
    if (!object) {
        return;
    }
    if (!(keypath != null ? keypath.length : void 0)) {
        return;
    }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzIjpbIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0FBQUEsSUFBQTs7QUFRQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVI7OztBQUVKOzs7OztBQUtBLEdBQUEsR0FBTSxTQUFDLE1BQUQsRUFBUyxPQUFULEVBQWtCLFlBQWxCO0FBRUYsUUFBQTtJQUFBLElBQVUsQ0FBSSxNQUFkO0FBQUEsZUFBQTs7SUFDQSxJQUFVLG9CQUFJLE9BQU8sQ0FBRSxnQkFBdkI7QUFBQSxlQUFBOztJQUVBLElBQStCLENBQUMsQ0FBQyxRQUFGLENBQVcsT0FBWCxDQUEvQjtRQUFBLE9BQUEsR0FBVSxPQUFPLENBQUMsS0FBUixDQUFjLEdBQWQsRUFBVjs7SUFFQSxFQUFBLEdBQUssQ0FBQyxDQUFDLEtBQUYsQ0FBUSxPQUFSO0FBRUwsV0FBTSxFQUFFLENBQUMsTUFBVDtRQUNJLE1BQUEsR0FBUyxNQUFPLENBQUEsRUFBRSxDQUFDLEtBQUgsQ0FBQSxDQUFBO1FBQ2hCLElBQTJCLGNBQTNCO0FBQUEsbUJBQU8sYUFBUDs7SUFGSjtXQUlBO0FBYkU7O0FBZU4sTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIjIyNcbiAwMDAwMDAwICAgMDAwMDAwMDAgIDAwMDAwMDAwMFxuMDAwICAgICAgICAwMDAgICAgICAgICAgMDAwXG4wMDAgIDAwMDAgIDAwMDAwMDAgICAgICAwMDBcbjAwMCAgIDAwMCAgMDAwICAgICAgICAgIDAwMFxuIDAwMDAwMDAgICAwMDAwMDAwMCAgICAgMDAwXG4jIyNcblxuXyA9IHJlcXVpcmUgJ2xvZGFzaCdcblxuIyMjXG4jIGFjY2VwdHMgYW4gb2JqZWN0IGFuZCBhIGtleXBhdGggYXMgYSBsaXN0IG9yIHN0cmluZyBhbmQgYSB2YWx1ZVxuIyByZXR1cm5zIHRoZSB2YWx1ZSBhdCBrZXlwYXRoIG9yIHVuZGVmaW5lZFxuIyMjXG5cbmdldCA9IChvYmplY3QsIGtleXBhdGgsIGRlZmF1bHRWYWx1ZSkgLT5cblxuICAgIHJldHVybiBpZiBub3Qgb2JqZWN0XG4gICAgcmV0dXJuIGlmIG5vdCBrZXlwYXRoPy5sZW5ndGhcblxuICAgIGtleXBhdGggPSBrZXlwYXRoLnNwbGl0ICcuJyBpZiBfLmlzU3RyaW5nIGtleXBhdGhcblxuICAgIGtwID0gXy5jbG9uZSBrZXlwYXRoXG5cbiAgICB3aGlsZSBrcC5sZW5ndGhcbiAgICAgICAgb2JqZWN0ID0gb2JqZWN0W2twLnNoaWZ0KCldXG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWUgaWYgbm90IG9iamVjdD9cblxuICAgIG9iamVjdFxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFxuIl19
//# sourceURL=../coffee/get.coffee