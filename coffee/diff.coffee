###
0000000    000  00000000  00000000
000   000  000  000       000     
000   000  000  000000    000000  
000   000  000  000       000     
0000000    000  000       000     
###

_      = require 'lodash'
regexp = require './regexp'
get    = require './get'
noon   = require 'noon'

log = console.log

class diff
    
    @two: (c, a) -> 
        
        tc = @traverse c, () -> true
        ta = @traverse a, () -> true
        
        pc0 = (x,y) -> x[0][0] == y[0][0]
        dac = _.differenceWith   ta, tc, pc0
        dca = _.differenceWith   tc, ta, pc0
        udd = _.unionWith       dac, dca, _.isEqual
        
        uac = _.intersectionWith tc, ta,  _.isEqual
        rst = _.unionWith        tc, ta,  _.isEqual
        rst = _.differenceWith  rst, udd, _.isEqual
        rst = _.differenceWith  rst, uac, _.isEqual
        rst = _.differenceWith  rst, tc,  _.isEqual

        diff: rst.map    (t) -> [t[0], get(c, t[0]), t[1]]
        new:  dac.filter (t) ->  t[0].length == 1
        same: uac.filter (t) ->  t[0].length == 1
        del:  dca.filter (t) ->  t[0].length == 1
                
    @three: (a, b, c) -> 
        
        da = @two c, a
        db = @two c, b
        
        log 'ta'.red, ta
        log 'tb'.green, tb
        log 'tc'.magenta, tc
        
        comp = (x,y) -> x[0][0] == y[0][0]
            # log x, y 
        log "diff a b".red, _.differenceWith ta, tb, comp
        log "diff a c".red, _.differenceWith ta, tc, comp
        log "diff b c".red, _.differenceWith tb, tc, comp
        log "diff a b c".yellow, _.differenceWith ta, tb, tc, comp
        
        log "union a b".red, _.unionWith ta, tb, comp
        log "union a c".red, _.unionWith ta, tc, comp
        log "union b c".red, _.unionWith tb, tc, comp
        log "union a b c".yellow, _.unionWith ta, tb, tc, comp
        
        
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
                        result.push [_.clone(keyPath), v]
                        return result if count > 0 and result.length >= count
                    if v?.constructor.name in ["Array", "Object"]
                        @traverse v, func, count, keyPath, result
                    keyPath.pop()
            when "Object"
                for k,v of node
                    keyPath.push k
                    if func keyPath, k,v
                        result.push [_.clone(keyPath), v]
                        return result if count > 0 and result.length >= count
                    if v?.constructor.name in ["Array", "Object"]
                        @traverse v, func, count, keyPath, result
                    keyPath.pop()
        return result
        
module.exports = diff
