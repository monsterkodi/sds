###
0000000    000  00000000  00000000
000   000  000  000       000     
000   000  000  000000    000000  
000   000  000  000       000     
0000000    000  000       000
###

_       = require 'lodash'
collect = require './collect'
regexp  = require './regexp'
get     = require './get'
tools   = require './tools'
noon    = require 'noon'

log      = console.log
toplevel = tools.toplevel
sortpath = tools.sortpath

class diff
    
    ###
    000000000  000   000   0000000 
       000     000 0 000  000   000
       000     000000000  000   000
       000     000   000  000   000
       000     00     00   0000000 
    ###
    ###
    # accepts two objects a and b
    # returns an object
    #
    #   diff: [ list of [keypath, value_a, value_b] for changed values      ]
    #   same: [ list of [keypath, value]            for unchanged values    ]
    #   new:  [ list of [keypath, value_b]          for new values in b     ]
    #   del:  [ list of [keypath, value_a]          for values deleted in b ]
    #
    # the diff list might contain changes at keypath.length > 1
    ###
    
    @two: (c, a) -> 
        
        tc = collect c
        ta = collect a
        
        pc0 = (x,y) -> x[0][0] == y[0][0]
        nac = _.differenceWith   ta, tc, pc0             # new
        dac = _.differenceWith   tc, ta, pc0             # deleted
        und = _.unionWith       nac, dac, _.isEqual      # new or deleted
        sme = _.intersectionWith tc, ta,  _.isEqual      # unchanged
        dff = _.unionWith        tc, ta,  _.isEqual      # diff = all - new - del - same
        dff = _.differenceWith  dff, und, sme, tc, _.isEqual

        diff: sortpath dff.map    (t) -> [t[0], get(c, t[0]), t[1]] 
        new:  sortpath toplevel nac
        same: sortpath toplevel sme
        del:  sortpath toplevel dac
    
    ###
    000000000  000   000  00000000   00000000  00000000
       000     000   000  000   000  000       000     
       000     000000000  0000000    0000000   0000000 
       000     000   000  000   000  000       000     
       000     000   000  000   000  00000000  00000000
    ###
    ###
    # accepts three objects c, a and b
    # returns an object
    #
    #   diff: [ list of [keypath, value_a, value_b] for conflicting values in a and b   ]
    #   del:  [ list of [keypath, value_c]          for unproblematic deleted in a and or b ]
    #   same: [ list of [keypath, value]            for unproblematic values in a and b ]
    #
    #   unproblematic:
    #         values: same in a and b or only new in a or only new in b
    #         deleted: deleted in both a and b or deleted in one and unchanged between c and the other
    #
    #   some intermediate results are included as well...
    # 
    #   c2a:  changes between c and a
    #   c2b:  changes between c and b
    #   a2b:  changes between a and b
    #   b2a:  changes between b and a
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
        dff = toplevel dff
        dff = dff.map (t) -> [t[0], get(a, t[0]), get(b, t[0])]
        dff = _.uniqWith dff, _.isEqual

        dla = _.intersectionWith ca.del, cb.same, _.isEqual
        dlb = _.intersectionWith cb.del, ca.same, _.isEqual
        del = _.unionWith        dla,    dlb,     _.isEqual
        
        c2a:  ca
        c2b:  cb
        a2b:  ab
        b2a:  ba
        same: sortpath sme
        diff: sortpath dff
        del:  del
                
module.exports = diff
