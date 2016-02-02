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
    
    ###
    000000000  000   000   0000000 
       000     000 0 000  000   000
       000     000000000  000   000
       000     000   000  000   000
       000     00     00   0000000 
    ###
    
    @two: (c, a) -> 
        
        tc = @traverse c
        ta = @traverse a
        
        pc0 = (x,y) -> x[0][0] == y[0][0]
        nac = _.differenceWith   ta, tc, pc0             # new
        dac = _.differenceWith   tc, ta, pc0             # deleted
        und = _.unionWith       nac, dac, _.isEqual      # new or deleted
        sme = _.intersectionWith tc, ta,  _.isEqual      # unchanged
        dff = _.unionWith        tc, ta,  _.isEqual      # diff = all - new - del - same
        dff = _.differenceWith  dff, und, sme, tc, _.isEqual

        diff: @sortpth dff.map    (t) -> [t[0], get(c, t[0]), t[1]] 
        new:  @sortpth @toplevel nac
        same: @sortpth @toplevel sme
        del:  @sortpth @toplevel dac
    
    ###
    000000000  000   000  00000000   00000000  00000000
       000     000   000  000   000  000       000     
       000     000000000  0000000    0000000   0000000 
       000     000   000  000   000  000       000     
       000     000   000  000   000  00000000  00000000
    ###
                
    @three: (c, a, b) -> 
        
        ca = @two c, a
        cb = @two c, b
        ab = @two a, b
        ba = @two b, a
        
        keq = (x,y) -> x[0][0] == y[0][0]
        ssm = _.intersectionWith ca.same, cb.same, _.isEqual # same in same
        snw = _.unionWith ca.new, cb.new, _.isEqual          # new ...
        snw = snw.filter (t) ->                              #     and
            f = 0                                            #     ...
            for t2 in snw                                    #     not
                f += 1 if t2[0][0] == t[0][0]                #     ...
            f == 1                                           #     different
        sdf = _.intersectionWith ca.diff, cb.diff, _.isEqual # same in diff
        cha = _.intersectionWith cb.same, ca.diff, keq       # changed in a
        chb = _.intersectionWith ca.same, cb.diff, keq       # changed in b
        cha = _.uniqWith (cha.map (t) -> [t[0], get(a, t[0])]), _.isEqual
        chb = _.uniqWith (chb.map (t) -> [t[0], get(b, t[0])]), _.isEqual
        sdf = sdf.map (t) -> [t[0], t[2]]
        sme = _.unionWith ssm, snw, sdf, cha, chb, _.isEqual # union of sames or changed on one side only

        dff = _.unionWith ca.diff, cb.diff, ca.new, cb.new,     _.isEqual # diff = union of diff and new
        dff = _.differenceWith dff, sme, keq                 #        minus union of sames
        dff = @toplevel dff
        dff = dff.map (t) -> [t[0], get(a, t[0]), get(b, t[0])]
        dff = _.uniqWith dff, _.isEqual

        dla = _.intersectionWith ca.del, cb.same, _.isEqual
        dlb = _.intersectionWith cb.del, ca.same, _.isEqual
        del = _.unionWith dla, dlb, _.isEqual
        
        c2a:  ca
        c2b:  cb
        a2b:  ab
        b2a:  ba
        same: @sortpth sme
        diff: @sortpth dff
        del:  del

    ###
    000000000  00000000    0000000   000   000  00000000  00000000    0000000  00000000
       000     000   000  000   000  000   000  000       000   000  000       000     
       000     0000000    000000000   000 000   0000000   0000000    0000000   0000000 
       000     000   000  000   000     000     000       000   000       000  000     
       000     000   000  000   000      0      00000000  000   000  0000000   00000000
    ###
    
    @traverse: (node, count=-1, keyPath=[], result=[]) ->
        switch node.constructor.name
            when "Array"
                for i in [0...node.length]
                    v = node[i]
                    keyPath.push i
                    result.push [_.clone(keyPath), v]
                    return result if count > 0 and result.length >= count
                    if v?.constructor.name in ["Array", "Object"]
                        @traverse v, count, keyPath, result
                    keyPath.pop()
            when "Object"
                for k,v of node
                    keyPath.push k
                    result.push [_.clone(keyPath), v]
                    return result if count > 0 and result.length >= count
                    if v?.constructor.name in ["Array", "Object"]
                        @traverse v, count, keyPath, result
                    keyPath.pop()
        return result

    ###
    000000000   0000000    0000000   000       0000000
       000     000   000  000   000  000      000     
       000     000   000  000   000  000      0000000 
       000     000   000  000   000  000           000
       000      0000000    0000000   0000000  0000000 
    ###

    @toplevel = (l) -> l.filter (t) -> t[0].length == 1

    @sortpth = (l) -> 
        l.sort (a,b) -> 
            ap = a[0].join('.')
            bp = b[0].join('.')
            if ap == bp then 0
            else if ap > bp then 1
            else -1
        
module.exports = diff
