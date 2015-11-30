###
00000000  000  000   000  0000000  
000       000  0000  000  000   000
000000    000  000 0 000  000   000
000       000  000  0000  000   000
000       000  000   000  0000000  
###

_ = require 'lodash'

class find

    @traverse: (node, func, count=-1, keyPath=[], result=[]) ->
        switch node.constructor.name
            when "Array"
                for i in [0...node.length]
                    v = node[i]
                    keyPath.push i
                    if func keyPath, i,v
                        result.push _.clone(keyPath, true)
                        return result if count > 0 and result.length >= count                    
                    if v.constructor.name in ["Array", "Object"]
                        @traverse v, func, count, keyPath, result
                    keyPath.pop()
            when "Object"
                for k,v of node
                    keyPath.push k
                    if func keyPath, k,v
                        result.push _.clone(keyPath, true)
                        return result if count > 0 and result.length >= count
                    if v?.constructor.name in ["Array", "Object"]
                        @traverse v, func, count, keyPath, result
                    keyPath.pop()
        return result

    @keyValue: (node, key, value) -> @traverse node, (p,k,v) => @match(k, key) and @match(v, value)
    @key:      (node, key)        -> @traverse node, (p,k,v) => @match(k, key)
    @value:    (node, value)      -> @traverse node, (p,k,v) => @match(v, value)
    @path:     (node, path)       -> @traverse node, (p,k,v) => @match(p.join('.'), path)

    @keyPath:  (node, keyPath) ->
        kp = _.clone keyPath
        while kp.length
            node = node[kp.shift()]
            return if not node?
        node
        
    @match: (a,b) ->
        if _.isString(a) and _.isString(b)
            p = _.clone(b)
            p = p.replace /\*/g, '.*'
            p = "^"+p+"$"
            a.match(new RegExp(p))?.length
        else
            a == b
        
module.exports = find
