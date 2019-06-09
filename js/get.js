// koffee 0.56.0

/*
 0000000   00000000  000000000
000        000          000
000  0000  0000000      000
000   000  000          000
 0000000   00000000     000
 */
var get;

get = function(object, keypath, defaultValue) {
    var kp;
    if (!object) {
        return;
    }
    if (!(keypath != null ? keypath.length : void 0)) {
        return;
    }
    if (typeof keypath === 'string') {
        keypath = keypath.split('.');
    }
    kp = [].concat(keypath);
    while (kp.length) {
        object = object[kp.shift()];
        if (object == null) {
            return defaultValue;
        }
    }
    return object;
};

module.exports = get;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzIjpbIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0FBQUEsSUFBQTs7QUFXQSxHQUFBLEdBQU0sU0FBQyxNQUFELEVBQVMsT0FBVCxFQUFrQixZQUFsQjtBQUVGLFFBQUE7SUFBQSxJQUFVLENBQUksTUFBZDtBQUFBLGVBQUE7O0lBQ0EsSUFBVSxvQkFBSSxPQUFPLENBQUUsZ0JBQXZCO0FBQUEsZUFBQTs7SUFFQSxJQUErQixPQUFPLE9BQVAsS0FBbUIsUUFBbEQ7UUFBQSxPQUFBLEdBQVUsT0FBTyxDQUFDLEtBQVIsQ0FBYyxHQUFkLEVBQVY7O0lBRUEsRUFBQSxHQUFLLEVBQUUsQ0FBQyxNQUFILENBQVUsT0FBVjtBQUVMLFdBQU0sRUFBRSxDQUFDLE1BQVQ7UUFDSSxNQUFBLEdBQVMsTUFBTyxDQUFBLEVBQUUsQ0FBQyxLQUFILENBQUEsQ0FBQTtRQUNoQixJQUEyQixjQUEzQjtBQUFBLG1CQUFPLGFBQVA7O0lBRko7V0FJQTtBQWJFOztBQWVOLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXG4gMDAwMDAwMCAgIDAwMDAwMDAwICAwMDAwMDAwMDBcbjAwMCAgICAgICAgMDAwICAgICAgICAgIDAwMFxuMDAwICAwMDAwICAwMDAwMDAwICAgICAgMDAwXG4wMDAgICAwMDAgIDAwMCAgICAgICAgICAwMDBcbiAwMDAwMDAwICAgMDAwMDAwMDAgICAgIDAwMFxuIyMjXG5cbiMgYWNjZXB0cyBhbiBvYmplY3QgYW5kIGEga2V5cGF0aCBhcyBhIGxpc3Qgb3Igc3RyaW5nIGFuZCBhIHZhbHVlXG4jIHJldHVybnMgdGhlIHZhbHVlIGF0IGtleXBhdGggb3IgdW5kZWZpbmVkXG5cbmdldCA9IChvYmplY3QsIGtleXBhdGgsIGRlZmF1bHRWYWx1ZSkgLT5cblxuICAgIHJldHVybiBpZiBub3Qgb2JqZWN0XG4gICAgcmV0dXJuIGlmIG5vdCBrZXlwYXRoPy5sZW5ndGhcblxuICAgIGtleXBhdGggPSBrZXlwYXRoLnNwbGl0ICcuJyBpZiB0eXBlb2Yoa2V5cGF0aCkgPT0gJ3N0cmluZydcblxuICAgIGtwID0gW10uY29uY2F0IGtleXBhdGhcblxuICAgIHdoaWxlIGtwLmxlbmd0aFxuICAgICAgICBvYmplY3QgPSBvYmplY3Rba3Auc2hpZnQoKV1cbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZSBpZiBub3Qgb2JqZWN0P1xuXG4gICAgb2JqZWN0XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0XG4iXX0=
//# sourceURL=../coffee/get.coffee