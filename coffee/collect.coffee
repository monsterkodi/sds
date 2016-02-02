###
 0000000   0000000   000      000      00000000   0000000  000000000
000       000   000  000      000      000       000          000   
000       000   000  000      000      0000000   000          000   
000       000   000  000      000      000       000          000   
 0000000   0000000   0000000  0000000  00000000   0000000     000   
###
#
# accepts an object node
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
#      value:   same as get(node, keypath)

_ = require 'lodash'

collect = (node, filter, map, count=-1, keyPath=[], result=[]) ->

    filter ?= (p,k,v) -> true
    map    ?= (p,v) -> [p,v]

    switch node.constructor.name
        when "Array"
            for i in [0...node.length]
                v = node[i]
                keyPath.push i
                if filter keyPath, i,v
                    result.push map _.clone(keyPath), v
                    return result if count > 0 and result.length >= count
                if v?.constructor.name in ["Array", "Object"]
                    collect v, filter, map, count, keyPath, result
                keyPath.pop()
        when "Object"
            for k,v of node
                keyPath.push k
                if filter keyPath, k,v
                    result.push map _.clone(keyPath), v
                    return result if count > 0 and result.length >= count
                if v?.constructor.name in ["Array", "Object"]
                    collect v, filter, map, count, keyPath, result
                keyPath.pop()
    return result

module.exports = collect