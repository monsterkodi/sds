// koffee 1.14.0

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdC5qcyIsInNvdXJjZVJvb3QiOiIuLi9jb2ZmZWUiLCJzb3VyY2VzIjpbImNvbGxlY3QuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7QUFBQSxJQUFBOztBQXNCQSxPQUFBLEdBQVUsU0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixHQUFqQixFQUFzQixLQUF0QixFQUFnQyxPQUFoQyxFQUE0QyxNQUE1QztBQUVOLFFBQUE7O1FBRjRCLFFBQU0sQ0FBQzs7O1FBQUcsVUFBUTs7O1FBQUksU0FBTzs7O1FBRXpEOztRQUFBLFNBQVUsU0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUw7bUJBQVc7UUFBWDs7O1FBQ1Y7O1FBQUEsTUFBVSxTQUFDLENBQUQsRUFBRyxDQUFIO21CQUFTLENBQUMsQ0FBRCxFQUFHLENBQUg7UUFBVDs7QUFFVixZQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBMUI7QUFBQSxhQUVTLE9BRlQ7QUFHUSxpQkFBUyxzRkFBVDtnQkFDSSxDQUFBLEdBQUksTUFBTyxDQUFBLENBQUE7Z0JBQ1gsT0FBTyxDQUFDLElBQVIsQ0FBYSxDQUFiO2dCQUNBLElBQUcsTUFBQSxDQUFPLE9BQVAsRUFBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsQ0FBSDtvQkFDSSxNQUFNLENBQUMsSUFBUCxDQUFZLEdBQUEsQ0FBSSxFQUFFLENBQUMsTUFBSCxDQUFVLE9BQVYsQ0FBSixFQUF3QixDQUF4QixDQUFaO29CQUNBLElBQWlCLEtBQUEsR0FBUSxDQUFSLElBQWMsTUFBTSxDQUFDLE1BQVAsSUFBaUIsS0FBaEQ7QUFBQSwrQkFBTyxPQUFQO3FCQUZKOztnQkFHQSx3QkFBRyxDQUFDLENBQUUsV0FBVyxDQUFDLGNBQWYsS0FBd0IsT0FBeEIsSUFBQSxJQUFBLEtBQWlDLFFBQXBDO29CQUNJLE9BQUEsQ0FBUSxDQUFSLEVBQVcsTUFBWCxFQUFtQixHQUFuQixFQUF3QixLQUF4QixFQUErQixPQUEvQixFQUF3QyxNQUF4QyxFQURKOztnQkFFQSxPQUFPLENBQUMsR0FBUixDQUFBO0FBUko7QUFEQztBQUZULGFBYVMsUUFiVDtBQWNRLGlCQUFBLFdBQUE7O2dCQUNJLE9BQU8sQ0FBQyxJQUFSLENBQWEsQ0FBYjtnQkFDQSxJQUFHLE1BQUEsQ0FBTyxPQUFQLEVBQWdCLENBQWhCLEVBQWtCLENBQWxCLENBQUg7b0JBQ0ksTUFBTSxDQUFDLElBQVAsQ0FBWSxHQUFBLENBQUksRUFBRSxDQUFDLE1BQUgsQ0FBVSxPQUFWLENBQUosRUFBd0IsQ0FBeEIsQ0FBWjtvQkFDQSxJQUFpQixLQUFBLEdBQVEsQ0FBUixJQUFjLE1BQU0sQ0FBQyxNQUFQLElBQWlCLEtBQWhEO0FBQUEsK0JBQU8sT0FBUDtxQkFGSjs7Z0JBR0Esd0JBQUcsQ0FBQyxDQUFFLFdBQVcsQ0FBQyxjQUFmLEtBQXdCLE9BQXhCLElBQUEsSUFBQSxLQUFpQyxRQUFwQztvQkFDSSxPQUFBLENBQVEsQ0FBUixFQUFXLE1BQVgsRUFBbUIsR0FBbkIsRUFBd0IsS0FBeEIsRUFBK0IsT0FBL0IsRUFBd0MsTUFBeEMsRUFESjs7Z0JBRUEsT0FBTyxDQUFDLEdBQVIsQ0FBQTtBQVBKO0FBZFI7V0FzQkE7QUEzQk07O0FBNkJWLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXG4gMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAgICAgICAwMDAgICAgICAwMDAwMDAwMCAgIDAwMDAwMDAgIDAwMDAwMDAwMFxuMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgICAgMDAwICAgICAgMDAwICAgICAgIDAwMCAgICAgICAgICAwMDAgICBcbjAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgICAgIDAwMCAgICAgIDAwMDAwMDAgICAwMDAgICAgICAgICAgMDAwICAgXG4wMDAgICAgICAgMDAwICAgMDAwICAwMDAgICAgICAwMDAgICAgICAwMDAgICAgICAgMDAwICAgICAgICAgIDAwMCAgIFxuIDAwMDAwMDAgICAwMDAwMDAwICAgMDAwMDAwMCAgMDAwMDAwMCAgMDAwMDAwMDAgICAwMDAwMDAwICAgICAwMDAgICBcbiMjI1xuXG4jIGFjY2VwdHMgYW4gb2JqZWN0XG4jICAgICAgICAgYSBmaWx0ZXIgKGtleXBhdGgsIGtleSwgdmFsdWUpIC0+IHRydWUgICAgICAgICMgZmFsc2UgdG8gZXhjbHVkZVxuIyAgICAgICAgIGEgbWFwICAgIChrZXlwYXRoLCB2YWx1ZSkgLT4gW2tleXBhdGgsIHZhbHVlXSAjIG1hcHMgcmVzdWx0c1xuIyAgICAgICAgIFxuIyByZXR1cm5zIGEgbGlzdCBvZiBsaXN0c1xuI1xuIyAgICAgICAgIFtcbiMgICAgICAgICAgICBbIGtleXBhdGgsIHZhbHVlIF1cbiMgICAgICAgICAgICAgIC4uLlxuIyAgICAgICAgIF1cbiNcbiMgd2l0aCBrZXlwYXRoOiBhIGxpc3Qgb2Ygc3RyaW5ncyBhbmQgaW50ZWdlcnNcbiMgICAgICB2YWx1ZTogICBzYW1lIGFzIGdldChvYmplY3QsIGtleXBhdGgpXG5cbmNvbGxlY3QgPSAob2JqZWN0LCBmaWx0ZXIsIG1hcCwgY291bnQ9LTEsIGtleVBhdGg9W10sIHJlc3VsdD1bXSkgLT5cblxuICAgIGZpbHRlciA/PSAocCxrLHYpIC0+IHRydWVcbiAgICBtYXAgICAgPz0gKHAsdikgLT4gW3Asdl1cblxuICAgIHN3aXRjaCBvYmplY3QuY29uc3RydWN0b3IubmFtZVxuICAgICAgICBcbiAgICAgICAgd2hlbiBcIkFycmF5XCJcbiAgICAgICAgICAgIGZvciBpIGluIFswLi4ub2JqZWN0Lmxlbmd0aF1cbiAgICAgICAgICAgICAgICB2ID0gb2JqZWN0W2ldXG4gICAgICAgICAgICAgICAga2V5UGF0aC5wdXNoIGlcbiAgICAgICAgICAgICAgICBpZiBmaWx0ZXIga2V5UGF0aCwgaSx2XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoIG1hcCBbXS5jb25jYXQoa2V5UGF0aCksIHZcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCBpZiBjb3VudCA+IDAgYW5kIHJlc3VsdC5sZW5ndGggPj0gY291bnRcbiAgICAgICAgICAgICAgICBpZiB2Py5jb25zdHJ1Y3Rvci5uYW1lIGluIFtcIkFycmF5XCIsIFwiT2JqZWN0XCJdXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3QgdiwgZmlsdGVyLCBtYXAsIGNvdW50LCBrZXlQYXRoLCByZXN1bHRcbiAgICAgICAgICAgICAgICBrZXlQYXRoLnBvcCgpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIHdoZW4gXCJPYmplY3RcIlxuICAgICAgICAgICAgZm9yIGssdiBvZiBvYmplY3RcbiAgICAgICAgICAgICAgICBrZXlQYXRoLnB1c2gga1xuICAgICAgICAgICAgICAgIGlmIGZpbHRlciBrZXlQYXRoLCBrLHZcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2ggbWFwIFtdLmNvbmNhdChrZXlQYXRoKSwgdlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0IGlmIGNvdW50ID4gMCBhbmQgcmVzdWx0Lmxlbmd0aCA+PSBjb3VudFxuICAgICAgICAgICAgICAgIGlmIHY/LmNvbnN0cnVjdG9yLm5hbWUgaW4gW1wiQXJyYXlcIiwgXCJPYmplY3RcIl1cbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdCB2LCBmaWx0ZXIsIG1hcCwgY291bnQsIGtleVBhdGgsIHJlc3VsdFxuICAgICAgICAgICAgICAgIGtleVBhdGgucG9wKClcbiAgICByZXN1bHRcblxubW9kdWxlLmV4cG9ydHMgPSBjb2xsZWN0XG4iXX0=
//# sourceURL=../coffee/collect.coffee