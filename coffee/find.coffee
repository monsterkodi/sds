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

    @key: (node, key) -> 
        keyReg = @reg key 
        @traverse node, (p,k,v) => @match k, keyReg

    @path: (node, path) -> 
        pthReg = @reg path
        @traverse node, (p,k,v) => @matchPath(p, pthReg)

    @value: (node, val) -> 
        valReg = @reg val         
        @traverse node, (p,k,v) => @match v, valReg
        
    @keyValue: (node, key, val) -> 
        keyReg = @reg key 
        valReg = @reg val 
        @traverse node, (p,k,v) => @match(k, keyReg) and @match(v, valReg)
                        
    @pathValue:(node, path, val) -> 
        pthReg = @reg path
        valReg = @reg val         
        @traverse node, (p,k,v) => @matchPath(p, pthReg) and @match(v, valReg)
        
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
    
    @traverse: (node, func) -> collect node, func, (p,v) -> p
        
module.exports = find
