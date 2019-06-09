###
00000000  000  000   000  0000000  
000       000  0000  000  000   000
000000    000  000 0 000  000   000
000       000  000  0000  000   000
000       000  000   000  0000000  
###

regexp  = require './regexp'
collect = require './collect'

class find

    # accept an object and a (key, path or value)
    # return a list of keypaths for matching (key, path or value)

    @key: (object, key) -> 
        keyReg = @reg key 
        @traverse object, (p,k,v) => @match k, keyReg

    @path: (object, path) -> 
        pthReg = @reg path
        @traverse object, (p,k,v) => @matchPath p, pthReg

    @value: (object, val) -> 
        valReg = @reg val         
        @traverse object, (p,k,v) => @match v, valReg

    # accept an object, a (key or path) and a value
    # return a list of keypaths for matching (key or path) and value combinations
        
    @keyValue: (object, key, val) -> 
        keyReg = @reg key 
        valReg = @reg val 
        @traverse object, (p,k,v) => @match(k, keyReg) and @match(v, valReg)
                        
    @pathValue:(object, path, val) -> 
        pthReg = @reg path
        valReg = @reg val         
        @traverse object, (p,k,v) => @matchPath(p, pthReg) and @match(v, valReg)
        
    @traverse: (object, func) -> collect object, func, (p,v) -> p
    
    # 00     00   0000000   000000000   0000000  000   000
    # 000   000  000   000     000     000       000   000
    # 000000000  000000000     000     000       000000000
    # 000 0 000  000   000     000     000       000   000
    # 000   000  000   000     000      0000000  000   000
    
    @matchPath: (a, r) -> @match a.join('.'), r
        
    @match: (a,r) ->
        if not (a instanceof Array)
            String(a).match(r)?.length
        else
            false

    @reg: (s) -> regexp s
        
module.exports = find
