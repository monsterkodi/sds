###
00000000  000  000   000  0000000  
000       000  0000  000  000   000
000000    000  000 0 000  000   000
000       000  000  0000  000   000
000       000  000   000  0000000  
###
_       = require 'lodash'
regexp  = require './regexp'
collect = require './collect'

class find

    ###
    # accept an object and a (key, path or value)
    # return a list of keypaths for matching (key, path or value)
    ###

    @key: (object, key) -> 
        keyReg = @reg key 
        @traverse object, (p,k,v) => @match k, keyReg

    @path: (object, path) -> 
        pthReg = @reg path
        @traverse object, (p,k,v) => @matchPath(p, pthReg)

    @value: (object, val) -> 
        valReg = @reg val         
        @traverse object, (p,k,v) => @match v, valReg

    ###
    # accept an object, a (key or path) and a value
    # return a list of keypaths for matching (key or path) and value combinations
    ###
        
    @keyValue: (object, key, val) -> 
        keyReg = @reg key 
        valReg = @reg val 
        @traverse object, (p,k,v) => @match(k, keyReg) and @match(v, valReg)
                        
    @pathValue:(object, path, val) -> 
        pthReg = @reg path
        valReg = @reg val         
        @traverse object, (p,k,v) => @matchPath(p, pthReg) and @match(v, valReg)
        
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
    
    @reg: (s) -> regexp s

    ###
    000000000  00000000    0000000   000   000  00000000  00000000    0000000  00000000
       000     000   000  000   000  000   000  000       000   000  000       000     
       000     0000000    000000000   000 000   0000000   0000000    0000000   0000000 
       000     000   000  000   000     000     000       000   000       000  000     
       000     000   000  000   000      0      00000000  000   000  0000000   00000000
    ###
    
    @traverse: (object, func) -> collect object, func, (p,v) -> p
        
module.exports = find
