###
0000000    000  00000000  00000000
000   000  000  000       000     
000   000  000  000000    000000  
000   000  000  000       000     
0000000    000  000       000     
###
_      = require 'lodash'
regexp = require './regexp'

class diff
        
    @three: (a, b, c) -> 
        a:  
            new:     [ 'o', 't', 'u' ]
            changed: [ 'p', 'r', 's' ]
            del:     [ 'v' ]
        b:  
            new:     [ 't', 'u' ]
            changed: [ 'p', 'r', 's' ]
            del:     [ 'v', 'z' ]

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
                    if v?.constructor.name in ["Array", "Object"]
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
        
module.exports = diff
