###
 0000000   0000000   000      000      00000000   0000000  000000000
000       000   000  000      000      000       000          000   
000       000   000  000      000      0000000   000          000   
000       000   000  000      000      000       000          000   
 0000000   0000000   0000000  0000000  00000000   0000000     000   
###

# accepts an object
#         a filter (keypath, key, value) -> true        # false to exclude
#         a map    (keypath, value) -> [keypath, value] # maps results
#         
# returns a list of lists
#
#         [
#            [ keypath, value ]
#              ...
#         ]
#
# with keypath: a list of strings and integers
#      value:   same as get(object, keypath)

collect = (object, filter, map, count=-1, keyPath=[], result=[]) ->

    filter ?= (p,k,v) -> true
    map    ?= (p,v) -> [p,v]

    switch object.constructor.name
        
        when "Array"
            for i in [0...object.length]
                v = object[i]
                keyPath.push i
                if filter keyPath, i,v
                    result.push map [].concat(keyPath), v
                    return result if count > 0 and result.length >= count
                if v?.constructor.name in ["Array", "Object"]
                    collect v, filter, map, count, keyPath, result
                keyPath.pop()
                
        when "Object"
            for k,v of object
                keyPath.push k
                if filter keyPath, k,v
                    result.push map [].concat(keyPath), v
                    return result if count > 0 and result.length >= count
                if v?.constructor.name in ["Array", "Object"]
                    collect v, filter, map, count, keyPath, result
                keyPath.pop()
    result

module.exports = collect
