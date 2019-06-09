// koffee 0.56.0

/*
 0000000   0000000   000      000      00000000   0000000  000000000
000       000   000  000      000      000       000          000   
000       000   000  000      000      0000000   000          000   
000       000   000  000      000      000       000          000   
 0000000   0000000   0000000  0000000  00000000   0000000     000
 */
var collect;

collect = function(object, filter, map, count, keyPath, result) {
    var i, j, k, ref, ref1, ref2, v;
    if (count == null) {
        count = -1;
    }
    if (keyPath == null) {
        keyPath = [];
    }
    if (result == null) {
        result = [];
    }
    if (filter != null) {
        filter;
    } else {
        filter = function(p, k, v) {
            return true;
        };
    }
    if (map != null) {
        map;
    } else {
        map = function(p, v) {
            return [p, v];
        };
    }
    switch (object.constructor.name) {
        case "Array":
            for (i = j = 0, ref = object.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
                v = object[i];
                keyPath.push(i);
                if (filter(keyPath, i, v)) {
                    result.push(map([].concat(keyPath), v));
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
                    result.push(map([].concat(keyPath), v));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdC5qcyIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlcyI6WyIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztBQUFBLElBQUE7O0FBc0JBLE9BQUEsR0FBVSxTQUFDLE1BQUQsRUFBUyxNQUFULEVBQWlCLEdBQWpCLEVBQXNCLEtBQXRCLEVBQWdDLE9BQWhDLEVBQTRDLE1BQTVDO0FBRU4sUUFBQTs7UUFGNEIsUUFBTSxDQUFDOzs7UUFBRyxVQUFROzs7UUFBSSxTQUFPOzs7UUFFekQ7O1FBQUEsU0FBVSxTQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTDttQkFBVztRQUFYOzs7UUFDVjs7UUFBQSxNQUFVLFNBQUMsQ0FBRCxFQUFHLENBQUg7bUJBQVMsQ0FBQyxDQUFELEVBQUcsQ0FBSDtRQUFUOztBQUVWLFlBQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUExQjtBQUFBLGFBRVMsT0FGVDtBQUdRLGlCQUFTLHNGQUFUO2dCQUNJLENBQUEsR0FBSSxNQUFPLENBQUEsQ0FBQTtnQkFDWCxPQUFPLENBQUMsSUFBUixDQUFhLENBQWI7Z0JBQ0EsSUFBRyxNQUFBLENBQU8sT0FBUCxFQUFnQixDQUFoQixFQUFrQixDQUFsQixDQUFIO29CQUNJLE1BQU0sQ0FBQyxJQUFQLENBQVksR0FBQSxDQUFJLEVBQUUsQ0FBQyxNQUFILENBQVUsT0FBVixDQUFKLEVBQXdCLENBQXhCLENBQVo7b0JBQ0EsSUFBaUIsS0FBQSxHQUFRLENBQVIsSUFBYyxNQUFNLENBQUMsTUFBUCxJQUFpQixLQUFoRDtBQUFBLCtCQUFPLE9BQVA7cUJBRko7O2dCQUdBLHdCQUFHLENBQUMsQ0FBRSxXQUFXLENBQUMsY0FBZixLQUF3QixPQUF4QixJQUFBLElBQUEsS0FBaUMsUUFBcEM7b0JBQ0ksT0FBQSxDQUFRLENBQVIsRUFBVyxNQUFYLEVBQW1CLEdBQW5CLEVBQXdCLEtBQXhCLEVBQStCLE9BQS9CLEVBQXdDLE1BQXhDLEVBREo7O2dCQUVBLE9BQU8sQ0FBQyxHQUFSLENBQUE7QUFSSjtBQURDO0FBRlQsYUFhUyxRQWJUO0FBY1EsaUJBQUEsV0FBQTs7Z0JBQ0ksT0FBTyxDQUFDLElBQVIsQ0FBYSxDQUFiO2dCQUNBLElBQUcsTUFBQSxDQUFPLE9BQVAsRUFBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsQ0FBSDtvQkFDSSxNQUFNLENBQUMsSUFBUCxDQUFZLEdBQUEsQ0FBSSxFQUFFLENBQUMsTUFBSCxDQUFVLE9BQVYsQ0FBSixFQUF3QixDQUF4QixDQUFaO29CQUNBLElBQWlCLEtBQUEsR0FBUSxDQUFSLElBQWMsTUFBTSxDQUFDLE1BQVAsSUFBaUIsS0FBaEQ7QUFBQSwrQkFBTyxPQUFQO3FCQUZKOztnQkFHQSx3QkFBRyxDQUFDLENBQUUsV0FBVyxDQUFDLGNBQWYsS0FBd0IsT0FBeEIsSUFBQSxJQUFBLEtBQWlDLFFBQXBDO29CQUNJLE9BQUEsQ0FBUSxDQUFSLEVBQVcsTUFBWCxFQUFtQixHQUFuQixFQUF3QixLQUF4QixFQUErQixPQUEvQixFQUF3QyxNQUF4QyxFQURKOztnQkFFQSxPQUFPLENBQUMsR0FBUixDQUFBO0FBUEo7QUFkUjtXQXNCQTtBQTNCTTs7QUE2QlYsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIjIyNcbiAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMCAgICAgIDAwMCAgICAgIDAwMDAwMDAwICAgMDAwMDAwMCAgMDAwMDAwMDAwXG4wMDAgICAgICAgMDAwICAgMDAwICAwMDAgICAgICAwMDAgICAgICAwMDAgICAgICAgMDAwICAgICAgICAgIDAwMCAgIFxuMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgICAgMDAwICAgICAgMDAwMDAwMCAgIDAwMCAgICAgICAgICAwMDAgICBcbjAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgICAgIDAwMCAgICAgIDAwMCAgICAgICAwMDAgICAgICAgICAgMDAwICAgXG4gMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAwMDAwICAwMDAwMDAwICAwMDAwMDAwMCAgIDAwMDAwMDAgICAgIDAwMCAgIFxuIyMjXG5cbiMgYWNjZXB0cyBhbiBvYmplY3RcbiMgICAgICAgICBhIGZpbHRlciAoa2V5cGF0aCwga2V5LCB2YWx1ZSkgLT4gdHJ1ZSAgICAgICAgIyBmYWxzZSB0byBleGNsdWRlXG4jICAgICAgICAgYSBtYXAgICAgKGtleXBhdGgsIHZhbHVlKSAtPiBba2V5cGF0aCwgdmFsdWVdICMgbWFwcyByZXN1bHRzXG4jICAgICAgICAgXG4jIHJldHVybnMgYSBsaXN0IG9mIGxpc3RzXG4jXG4jICAgICAgICAgW1xuIyAgICAgICAgICAgIFsga2V5cGF0aCwgdmFsdWUgXVxuIyAgICAgICAgICAgICAgLi4uXG4jICAgICAgICAgXVxuI1xuIyB3aXRoIGtleXBhdGg6IGEgbGlzdCBvZiBzdHJpbmdzIGFuZCBpbnRlZ2Vyc1xuIyAgICAgIHZhbHVlOiAgIHNhbWUgYXMgZ2V0KG9iamVjdCwga2V5cGF0aClcblxuY29sbGVjdCA9IChvYmplY3QsIGZpbHRlciwgbWFwLCBjb3VudD0tMSwga2V5UGF0aD1bXSwgcmVzdWx0PVtdKSAtPlxuXG4gICAgZmlsdGVyID89IChwLGssdikgLT4gdHJ1ZVxuICAgIG1hcCAgICA/PSAocCx2KSAtPiBbcCx2XVxuXG4gICAgc3dpdGNoIG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lXG4gICAgICAgIFxuICAgICAgICB3aGVuIFwiQXJyYXlcIlxuICAgICAgICAgICAgZm9yIGkgaW4gWzAuLi5vYmplY3QubGVuZ3RoXVxuICAgICAgICAgICAgICAgIHYgPSBvYmplY3RbaV1cbiAgICAgICAgICAgICAgICBrZXlQYXRoLnB1c2ggaVxuICAgICAgICAgICAgICAgIGlmIGZpbHRlciBrZXlQYXRoLCBpLHZcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2ggbWFwIFtdLmNvbmNhdChrZXlQYXRoKSwgdlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0IGlmIGNvdW50ID4gMCBhbmQgcmVzdWx0Lmxlbmd0aCA+PSBjb3VudFxuICAgICAgICAgICAgICAgIGlmIHY/LmNvbnN0cnVjdG9yLm5hbWUgaW4gW1wiQXJyYXlcIiwgXCJPYmplY3RcIl1cbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdCB2LCBmaWx0ZXIsIG1hcCwgY291bnQsIGtleVBhdGgsIHJlc3VsdFxuICAgICAgICAgICAgICAgIGtleVBhdGgucG9wKClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgd2hlbiBcIk9iamVjdFwiXG4gICAgICAgICAgICBmb3Igayx2IG9mIG9iamVjdFxuICAgICAgICAgICAgICAgIGtleVBhdGgucHVzaCBrXG4gICAgICAgICAgICAgICAgaWYgZmlsdGVyIGtleVBhdGgsIGssdlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCBtYXAgW10uY29uY2F0KGtleVBhdGgpLCB2XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQgaWYgY291bnQgPiAwIGFuZCByZXN1bHQubGVuZ3RoID49IGNvdW50XG4gICAgICAgICAgICAgICAgaWYgdj8uY29uc3RydWN0b3IubmFtZSBpbiBbXCJBcnJheVwiLCBcIk9iamVjdFwiXVxuICAgICAgICAgICAgICAgICAgICBjb2xsZWN0IHYsIGZpbHRlciwgbWFwLCBjb3VudCwga2V5UGF0aCwgcmVzdWx0XG4gICAgICAgICAgICAgICAga2V5UGF0aC5wb3AoKVxuICAgIHJlc3VsdFxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbGxlY3RcbiJdfQ==
//# sourceURL=../coffee/collect.coffee