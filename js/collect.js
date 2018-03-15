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

  ({_} = require('kxk'));

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdC5qcyIsInNvdXJjZVJvb3QiOiIuLiIsInNvdXJjZXMiOlsianMvY29sbGVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQUEsQ0FBQSxFQUFBOztFQVFBLENBQUEsQ0FBRSxDQUFGLENBQUEsR0FBUSxPQUFBLENBQVEsS0FBUixDQUFSOztFQW1CQSxPQUFBLEdBQVUsUUFBQSxDQUFDLE1BQUQsRUFBUyxNQUFULEVBQWlCLEdBQWpCLEVBQXNCLFFBQU0sQ0FBQyxDQUE3QixFQUFnQyxVQUFRLEVBQXhDLEVBQTRDLFNBQU8sRUFBbkQsQ0FBQTtBQUVOLFFBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUE7O01BQUEsU0FBVSxRQUFBLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLENBQUE7ZUFBVztNQUFYOzs7TUFDVixNQUFVLFFBQUEsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFBO2VBQVMsQ0FBQyxDQUFELEVBQUcsQ0FBSDtNQUFUOztBQUVWLFlBQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUExQjtBQUFBLFdBQ1MsT0FEVDtRQUVRLEtBQVMsd0ZBQVQ7VUFDSSxDQUFBLEdBQUksTUFBTyxDQUFBLENBQUE7VUFDWCxPQUFPLENBQUMsSUFBUixDQUFhLENBQWI7VUFDQSxJQUFHLE1BQUEsQ0FBTyxPQUFQLEVBQWdCLENBQWhCLEVBQWtCLENBQWxCLENBQUg7WUFDSSxNQUFNLENBQUMsSUFBUCxDQUFZLEdBQUEsQ0FBSSxDQUFDLENBQUMsS0FBRixDQUFRLE9BQVIsQ0FBSixFQUFzQixDQUF0QixDQUFaO1lBQ0EsSUFBaUIsS0FBQSxHQUFRLENBQVIsSUFBYyxNQUFNLENBQUMsTUFBUCxJQUFpQixLQUFoRDtBQUFBLHFCQUFPLE9BQVA7YUFGSjs7VUFHQSx3QkFBRyxDQUFDLENBQUUsV0FBVyxDQUFDLGNBQWYsS0FBd0IsT0FBeEIsSUFBQSxJQUFBLEtBQWlDLFFBQXBDO1lBQ0ksT0FBQSxDQUFRLENBQVIsRUFBVyxNQUFYLEVBQW1CLEdBQW5CLEVBQXdCLEtBQXhCLEVBQStCLE9BQS9CLEVBQXdDLE1BQXhDLEVBREo7O1VBRUEsT0FBTyxDQUFDLEdBQVIsQ0FBQTtRQVJKO0FBREM7QUFEVCxXQVdTLFFBWFQ7UUFZUSxLQUFBLFdBQUE7O1VBQ0ksT0FBTyxDQUFDLElBQVIsQ0FBYSxDQUFiO1VBQ0EsSUFBRyxNQUFBLENBQU8sT0FBUCxFQUFnQixDQUFoQixFQUFrQixDQUFsQixDQUFIO1lBQ0ksTUFBTSxDQUFDLElBQVAsQ0FBWSxHQUFBLENBQUksQ0FBQyxDQUFDLEtBQUYsQ0FBUSxPQUFSLENBQUosRUFBc0IsQ0FBdEIsQ0FBWjtZQUNBLElBQWlCLEtBQUEsR0FBUSxDQUFSLElBQWMsTUFBTSxDQUFDLE1BQVAsSUFBaUIsS0FBaEQ7QUFBQSxxQkFBTyxPQUFQO2FBRko7O1VBR0Esd0JBQUcsQ0FBQyxDQUFFLFdBQVcsQ0FBQyxjQUFmLEtBQXdCLE9BQXhCLElBQUEsSUFBQSxLQUFpQyxRQUFwQztZQUNJLE9BQUEsQ0FBUSxDQUFSLEVBQVcsTUFBWCxFQUFtQixHQUFuQixFQUF3QixLQUF4QixFQUErQixPQUEvQixFQUF3QyxNQUF4QyxFQURKOztVQUVBLE9BQU8sQ0FBQyxHQUFSLENBQUE7UUFQSjtBQVpSO0FBb0JBLFdBQU87RUF6QkQ7O0VBMkJWLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0FBdERqQiIsInNvdXJjZXNDb250ZW50IjpbIiMjI1xuIDAwMDAwMDAgICAwMDAwMDAwICAgMDAwICAgICAgMDAwICAgICAgMDAwMDAwMDAgICAwMDAwMDAwICAwMDAwMDAwMDBcbjAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgICAgIDAwMCAgICAgIDAwMCAgICAgICAwMDAgICAgICAgICAgMDAwICAgXG4wMDAgICAgICAgMDAwICAgMDAwICAwMDAgICAgICAwMDAgICAgICAwMDAwMDAwICAgMDAwICAgICAgICAgIDAwMCAgIFxuMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgICAgMDAwICAgICAgMDAwICAgICAgIDAwMCAgICAgICAgICAwMDAgICBcbiAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMDAwMDAgIDAwMDAwMDAgIDAwMDAwMDAwICAgMDAwMDAwMCAgICAgMDAwICAgXG4jIyNcblxueyBfIH0gPSByZXF1aXJlICdreGsnXG5cbiMjI1xuI1xuIyBhY2NlcHRzIGFuIG9iamVjdFxuIyAgICAgICAgIGEgZmlsdGVyIChrZXlwYXRoLCBrZXksIHZhbHVlKSAtPiB0cnVlICAgICAgICAjIGZhbHNlIHRvIGV4Y2x1ZGVcbiMgICAgICAgICBhIG1hcCAgICAoa2V5cGF0aCwgdmFsdWUpIC0+IFtrZXlwYXRoLCB2YWx1ZV0gIyBtYXBzIHJlc3VsdHNcbiMgICAgICAgICBcbiMgcmV0dXJucyBhIGxpc3Qgb2YgbGlzdHNcbiNcbiMgICAgICAgICBbXG4jICAgICAgICAgICAgWyBrZXlwYXRoLCB2YWx1ZSBdXG4jICAgICAgICAgICAgICAuLi5cbiMgICAgICAgICBdXG4jXG4jIHdpdGgga2V5cGF0aDogYSBsaXN0IG9mIHN0cmluZ3MgYW5kIGludGVnZXJzXG4jICAgICAgdmFsdWU6ICAgc2FtZSBhcyBnZXQob2JqZWN0LCBrZXlwYXRoKVxuIyMjXG5cbmNvbGxlY3QgPSAob2JqZWN0LCBmaWx0ZXIsIG1hcCwgY291bnQ9LTEsIGtleVBhdGg9W10sIHJlc3VsdD1bXSkgLT5cblxuICAgIGZpbHRlciA/PSAocCxrLHYpIC0+IHRydWVcbiAgICBtYXAgICAgPz0gKHAsdikgLT4gW3Asdl1cblxuICAgIHN3aXRjaCBvYmplY3QuY29uc3RydWN0b3IubmFtZVxuICAgICAgICB3aGVuIFwiQXJyYXlcIlxuICAgICAgICAgICAgZm9yIGkgaW4gWzAuLi5vYmplY3QubGVuZ3RoXVxuICAgICAgICAgICAgICAgIHYgPSBvYmplY3RbaV1cbiAgICAgICAgICAgICAgICBrZXlQYXRoLnB1c2ggaVxuICAgICAgICAgICAgICAgIGlmIGZpbHRlciBrZXlQYXRoLCBpLHZcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2ggbWFwIF8uY2xvbmUoa2V5UGF0aCksIHZcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCBpZiBjb3VudCA+IDAgYW5kIHJlc3VsdC5sZW5ndGggPj0gY291bnRcbiAgICAgICAgICAgICAgICBpZiB2Py5jb25zdHJ1Y3Rvci5uYW1lIGluIFtcIkFycmF5XCIsIFwiT2JqZWN0XCJdXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3QgdiwgZmlsdGVyLCBtYXAsIGNvdW50LCBrZXlQYXRoLCByZXN1bHRcbiAgICAgICAgICAgICAgICBrZXlQYXRoLnBvcCgpXG4gICAgICAgIHdoZW4gXCJPYmplY3RcIlxuICAgICAgICAgICAgZm9yIGssdiBvZiBvYmplY3RcbiAgICAgICAgICAgICAgICBrZXlQYXRoLnB1c2gga1xuICAgICAgICAgICAgICAgIGlmIGZpbHRlciBrZXlQYXRoLCBrLHZcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2ggbWFwIF8uY2xvbmUoa2V5UGF0aCksIHZcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCBpZiBjb3VudCA+IDAgYW5kIHJlc3VsdC5sZW5ndGggPj0gY291bnRcbiAgICAgICAgICAgICAgICBpZiB2Py5jb25zdHJ1Y3Rvci5uYW1lIGluIFtcIkFycmF5XCIsIFwiT2JqZWN0XCJdXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3QgdiwgZmlsdGVyLCBtYXAsIGNvdW50LCBrZXlQYXRoLCByZXN1bHRcbiAgICAgICAgICAgICAgICBrZXlQYXRoLnBvcCgpXG4gICAgcmV0dXJuIHJlc3VsdFxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbGxlY3QiXX0=
//# sourceURL=C:/Users/kodi/s/sds/coffee/collect.coffee