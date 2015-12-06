###
00000000  000  000   000  0000000  
000       000  0000  000  000   000
000000    000  000 0 000  000   000
000       000  000  0000  000   000
000       000  000   000  0000000  
###

_ = require 'lodash'

class find

    @value: (node, val) -> 
        valReg = @reg val         
        @traverse node, (p,k,v) => @match v, valReg
        
    @key: (node, key) -> 
        keyReg = @reg key 
        @traverse node, (p,k,v) => @match k, keyReg
        
    @path: (node, path) -> 
        pthReg = @reg path
        @traverse node, (p,k,v) => @matchPath(p, pthReg)
        
    @pathValue:(node, path, val) -> 
        pthReg = @reg path
        valReg = @reg val         
        @traverse node, (p,k,v) => @matchPath(p, pthReg) and @match(v, valReg)
        
    @keyValue: (node, key, val) -> 
        keyReg = @reg key 
        valReg = @reg val 
        @traverse node, (p,k,v) => @match(k, keyReg) and @match(v, valReg)

    ###
    00     00   0000000   000000000   0000000  000   000
    000   000  000   000     000     000       000   000
    000000000  000000000     000     000       000000000
    000 0 000  000   000     000     000       000   000
    000   000  000   000     000      0000000  000   000
    ###
    
    @matchPath: (a, r) -> @match a.join('.'), r
        
    @match: (a,r) ->
        if not _.isArray a
            String(a).match(r)?.length
        else
            false

    ###
    00000000   00000000   0000000 
    000   000  000       000      
    0000000    0000000   000  0000
    000   000  000       000   000
    000   000  00000000   0000000 
    ###
    
    @reg: (s) -> 
        s = s.replace /([^.]+\|[^.]+)/g, '($1)'
        s = s.replace /\./g, '\\.'
        s = s.replace /\^/g, '\\^'
        s = s.replace /\?/g, '[^.]'
        s = s.replace /\*\*/g, '####'
        s = s.replace /\*/g, '[^.]*'
        s = s.replace /####/g, '.*'
        # log s
        new RegExp "^"+s+"$"

    ###
    000000000  00000000    0000000   000   000  00000000  00000000    0000000  00000000
       000     000   000  000   000  000   000  000       000   000  000       000     
       000     0000000    000000000   000 000   0000000   0000000    0000000   0000000 
       000     000   000  000   000     000     000       000   000       000  000     
       000     000   000  000   000      0      00000000  000   000  0000000   00000000
    ###
    
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

    ###
    000   000  00000000  000   000  00000000    0000000   000000000  000   000
    000  000   000        000 000   000   000  000   000     000     000   000
    0000000    0000000     00000    00000000   000000000     000     000000000
    000  000   000          000     000        000   000     000     000   000
    000   000  00000000     000     000        000   000     000     000   000
    ###
    
    @keyPath:  (node, keyPath) ->
        kp = _.clone keyPath
        while kp.length
            node = node[kp.shift()]
            return if not node?
        node
        
module.exports = find
