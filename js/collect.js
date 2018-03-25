(function() {
  /*
   0000000   0000000   000      000      00000000   0000000  000000000
  000       000   000  000      000      000       000          000   
  000       000   000  000      000      0000000   000          000   
  000       000   000  000      000      000       000          000   
   0000000   0000000   0000000  0000000  00000000   0000000     000   
  */
  /*
   *
   * accepts an object
   *         a filter (keypath, key, value) -> true        # false to exclude
   *         a map    (keypath, value) -> [keypath, value] # maps results
   *         
   * returns a list of lists
   *
   *         [
   *            [ keypath, value ]
   *              ...
   *         ]
   *
   * with keypath: a list of strings and integers
   *      value:   same as get(object, keypath)
   */
  var _, collect;

  _ = require('lodash');

  collect = function(object, filter, map, count = -1, keyPath = [], result = []) {
    var i, j, k, ref, ref1, ref2, v;
    if (filter == null) {
      filter = function(p, k, v) {
        return true;
      };
    }
    if (map == null) {
      map = function(p, v) {
        return [p, v];
      };
    }
    switch (object.constructor.name) {
      case "Array":
        for (i = j = 0, ref = object.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          v = object[i];
          keyPath.push(i);
          if (filter(keyPath, i, v)) {
            result.push(map(_.clone(keyPath), v));
            if (count > 0 && result.length >= count) {
              return result;
            }
          }
          if ((ref1 = v != null ? v.constructor.name : void 0) === "Array" || ref1 === "Object") {
            collect(v, filter, map, count, keyPath, result);
          }
          keyPath.pop();
        }
        break;
      case "Object":
        for (k in object) {
          v = object[k];
          keyPath.push(k);
          if (filter(keyPath, k, v)) {
            result.push(map(_.clone(keyPath), v));
            if (count > 0 && result.length >= count) {
              return result;
            }
          }
          if ((ref2 = v != null ? v.constructor.name : void 0) === "Array" || ref2 === "Object") {
            collect(v, filter, map, count, keyPath, result);
          }
          keyPath.pop();
        }
    }
    return result;
  };

  module.exports = collect;

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdC5qcyIsInNvdXJjZVJvb3QiOiIuLiIsInNvdXJjZXMiOlsiY29mZmVlL2NvbGxlY3QuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBQSxDQUFBLEVBQUE7O0VBUUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSOztFQW1CSixPQUFBLEdBQVUsUUFBQSxDQUFDLE1BQUQsRUFBUyxNQUFULEVBQWlCLEdBQWpCLEVBQXNCLFFBQU0sQ0FBQyxDQUE3QixFQUFnQyxVQUFRLEVBQXhDLEVBQTRDLFNBQU8sRUFBbkQsQ0FBQTtBQUVOLFFBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUE7O01BQUEsU0FBVSxRQUFBLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLENBQUE7ZUFBVztNQUFYOzs7TUFDVixNQUFVLFFBQUEsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFBO2VBQVMsQ0FBQyxDQUFELEVBQUcsQ0FBSDtNQUFUOztBQUVWLFlBQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUExQjtBQUFBLFdBQ1MsT0FEVDtRQUVRLEtBQVMsd0ZBQVQ7VUFDSSxDQUFBLEdBQUksTUFBTyxDQUFBLENBQUE7VUFDWCxPQUFPLENBQUMsSUFBUixDQUFhLENBQWI7VUFDQSxJQUFHLE1BQUEsQ0FBTyxPQUFQLEVBQWdCLENBQWhCLEVBQWtCLENBQWxCLENBQUg7WUFDSSxNQUFNLENBQUMsSUFBUCxDQUFZLEdBQUEsQ0FBSSxDQUFDLENBQUMsS0FBRixDQUFRLE9BQVIsQ0FBSixFQUFzQixDQUF0QixDQUFaO1lBQ0EsSUFBaUIsS0FBQSxHQUFRLENBQVIsSUFBYyxNQUFNLENBQUMsTUFBUCxJQUFpQixLQUFoRDtBQUFBLHFCQUFPLE9BQVA7YUFGSjs7VUFHQSx3QkFBRyxDQUFDLENBQUUsV0FBVyxDQUFDLGNBQWYsS0FBd0IsT0FBeEIsSUFBQSxJQUFBLEtBQWlDLFFBQXBDO1lBQ0ksT0FBQSxDQUFRLENBQVIsRUFBVyxNQUFYLEVBQW1CLEdBQW5CLEVBQXdCLEtBQXhCLEVBQStCLE9BQS9CLEVBQXdDLE1BQXhDLEVBREo7O1VBRUEsT0FBTyxDQUFDLEdBQVIsQ0FBQTtRQVJKO0FBREM7QUFEVCxXQVdTLFFBWFQ7UUFZUSxLQUFBLFdBQUE7O1VBQ0ksT0FBTyxDQUFDLElBQVIsQ0FBYSxDQUFiO1VBQ0EsSUFBRyxNQUFBLENBQU8sT0FBUCxFQUFnQixDQUFoQixFQUFrQixDQUFsQixDQUFIO1lBQ0ksTUFBTSxDQUFDLElBQVAsQ0FBWSxHQUFBLENBQUksQ0FBQyxDQUFDLEtBQUYsQ0FBUSxPQUFSLENBQUosRUFBc0IsQ0FBdEIsQ0FBWjtZQUNBLElBQWlCLEtBQUEsR0FBUSxDQUFSLElBQWMsTUFBTSxDQUFDLE1BQVAsSUFBaUIsS0FBaEQ7QUFBQSxxQkFBTyxPQUFQO2FBRko7O1VBR0Esd0JBQUcsQ0FBQyxDQUFFLFdBQVcsQ0FBQyxjQUFmLEtBQXdCLE9BQXhCLElBQUEsSUFBQSxLQUFpQyxRQUFwQztZQUNJLE9BQUEsQ0FBUSxDQUFSLEVBQVcsTUFBWCxFQUFtQixHQUFuQixFQUF3QixLQUF4QixFQUErQixPQUEvQixFQUF3QyxNQUF4QyxFQURKOztVQUVBLE9BQU8sQ0FBQyxHQUFSLENBQUE7UUFQSjtBQVpSO0FBb0JBLFdBQU87RUF6QkQ7O0VBMkJWLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0FBdERqQiIsInNvdXJjZXNDb250ZW50IjpbIiMjI1xuIDAwMDAwMDAgICAwMDAwMDAwICAgMDAwICAgICAgMDAwICAgICAgMDAwMDAwMDAgICAwMDAwMDAwICAwMDAwMDAwMDBcbjAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgICAgIDAwMCAgICAgIDAwMCAgICAgICAwMDAgICAgICAgICAgMDAwICAgXG4wMDAgICAgICAgMDAwICAgMDAwICAwMDAgICAgICAwMDAgICAgICAwMDAwMDAwICAgMDAwICAgICAgICAgIDAwMCAgIFxuMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgICAgMDAwICAgICAgMDAwICAgICAgIDAwMCAgICAgICAgICAwMDAgICBcbiAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMDAwMDAgIDAwMDAwMDAgIDAwMDAwMDAwICAgMDAwMDAwMCAgICAgMDAwICAgXG4jIyNcblxuXyA9IHJlcXVpcmUgJ2xvZGFzaCdcblxuIyMjXG4jXG4jIGFjY2VwdHMgYW4gb2JqZWN0XG4jICAgICAgICAgYSBmaWx0ZXIgKGtleXBhdGgsIGtleSwgdmFsdWUpIC0+IHRydWUgICAgICAgICMgZmFsc2UgdG8gZXhjbHVkZVxuIyAgICAgICAgIGEgbWFwICAgIChrZXlwYXRoLCB2YWx1ZSkgLT4gW2tleXBhdGgsIHZhbHVlXSAjIG1hcHMgcmVzdWx0c1xuIyAgICAgICAgIFxuIyByZXR1cm5zIGEgbGlzdCBvZiBsaXN0c1xuI1xuIyAgICAgICAgIFtcbiMgICAgICAgICAgICBbIGtleXBhdGgsIHZhbHVlIF1cbiMgICAgICAgICAgICAgIC4uLlxuIyAgICAgICAgIF1cbiNcbiMgd2l0aCBrZXlwYXRoOiBhIGxpc3Qgb2Ygc3RyaW5ncyBhbmQgaW50ZWdlcnNcbiMgICAgICB2YWx1ZTogICBzYW1lIGFzIGdldChvYmplY3QsIGtleXBhdGgpXG4jIyNcblxuY29sbGVjdCA9IChvYmplY3QsIGZpbHRlciwgbWFwLCBjb3VudD0tMSwga2V5UGF0aD1bXSwgcmVzdWx0PVtdKSAtPlxuXG4gICAgZmlsdGVyID89IChwLGssdikgLT4gdHJ1ZVxuICAgIG1hcCAgICA/PSAocCx2KSAtPiBbcCx2XVxuXG4gICAgc3dpdGNoIG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lXG4gICAgICAgIHdoZW4gXCJBcnJheVwiXG4gICAgICAgICAgICBmb3IgaSBpbiBbMC4uLm9iamVjdC5sZW5ndGhdXG4gICAgICAgICAgICAgICAgdiA9IG9iamVjdFtpXVxuICAgICAgICAgICAgICAgIGtleVBhdGgucHVzaCBpXG4gICAgICAgICAgICAgICAgaWYgZmlsdGVyIGtleVBhdGgsIGksdlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCBtYXAgXy5jbG9uZShrZXlQYXRoKSwgdlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0IGlmIGNvdW50ID4gMCBhbmQgcmVzdWx0Lmxlbmd0aCA+PSBjb3VudFxuICAgICAgICAgICAgICAgIGlmIHY/LmNvbnN0cnVjdG9yLm5hbWUgaW4gW1wiQXJyYXlcIiwgXCJPYmplY3RcIl1cbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdCB2LCBmaWx0ZXIsIG1hcCwgY291bnQsIGtleVBhdGgsIHJlc3VsdFxuICAgICAgICAgICAgICAgIGtleVBhdGgucG9wKClcbiAgICAgICAgd2hlbiBcIk9iamVjdFwiXG4gICAgICAgICAgICBmb3Igayx2IG9mIG9iamVjdFxuICAgICAgICAgICAgICAgIGtleVBhdGgucHVzaCBrXG4gICAgICAgICAgICAgICAgaWYgZmlsdGVyIGtleVBhdGgsIGssdlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCBtYXAgXy5jbG9uZShrZXlQYXRoKSwgdlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0IGlmIGNvdW50ID4gMCBhbmQgcmVzdWx0Lmxlbmd0aCA+PSBjb3VudFxuICAgICAgICAgICAgICAgIGlmIHY/LmNvbnN0cnVjdG9yLm5hbWUgaW4gW1wiQXJyYXlcIiwgXCJPYmplY3RcIl1cbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdCB2LCBmaWx0ZXIsIG1hcCwgY291bnQsIGtleVBhdGgsIHJlc3VsdFxuICAgICAgICAgICAgICAgIGtleVBhdGgucG9wKClcbiAgICByZXR1cm4gcmVzdWx0XG5cbm1vZHVsZS5leHBvcnRzID0gY29sbGVjdCJdfQ==
//# sourceURL=C:/Users/kodi/s/sds/coffee/collect.coffee