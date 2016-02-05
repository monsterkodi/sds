###
000000000   0000000    0000000   000       0000000
   000     000   000  000   000  000      000     
   000     000   000  000   000  000      0000000 
   000     000   000  000   000  000           000
   000      0000000    0000000   0000000  0000000 
###

_   = require 'lodash'
set = require './set'

module.exports = 

    ###
    000000000   0000000   00000000   000      00000000  000   000  00000000  000    
       000     000   000  000   000  000      000       000   000  000       000    
       000     000   000  00000000   000      0000000    000 000   0000000   000    
       000     000   000  000        000      000          000     000       000    
       000      0000000   000        0000000  00000000      0      00000000  0000000
    ###
    #
    # accepts a list of [keypath, value] pairs
    # returns a list of [keypath, value] pairs with a path length of 1

    toplevel: (l) -> l.filter (t) -> t[0].length == 1

    ###
     0000000   0000000   00000000   000000000  00000000    0000000   000000000  000   000
    000       000   000  000   000     000     000   000  000   000     000     000   000
    0000000   000   000  0000000       000     00000000   000000000     000     000000000
         000  000   000  000   000     000     000        000   000     000     000   000
    0000000    0000000   000   000     000     000        000   000     000     000   000
    ###
    #
    # accepts a list of [keypath, value] pairs
    # returns a list of [keypath, value] pairs with keypaths sorted alphabetically
    #

    sortpath: (l) -> 
        
        l.sort (a,b) -> 
            ap = a[0].join('.')
            bp = b[0].join('.')
            if ap == bp then 0
            else if ap > bp then 1
            else -1

    ###
     0000000   0000000          000  00000000   0000000  000000000  000  00000000  000   000
    000   000  000   000        000  000       000          000     000  000        000 000 
    000   000  0000000          000  0000000   000          000     000  000000      00000  
    000   000  000   000  000   000  000       000          000     000  000          000   
     0000000   0000000     0000000   00000000   0000000     000     000  000          000   
    ###
    #
    # accepts a list of [keypath, ... value] pairs
    # returns an object contructed from that list
    #

    objectify: (l) ->
        o = {}
        for pv in l
            # console.log pv, pv[0]
            if pv.length > 1
                set o, pv[0], _.last pv
        o

    ###
    000      000   0000000  000000000  000  00000000  000   000
    000      000  000          000     000  000        000 000 
    000      000  0000000      000     000  000000      00000  
    000      000       000     000     000  000          000   
    0000000  000  0000000      000     000  000          000   
    ###
    #
    # accepts an object o
    # returns a list of [keypath, value] pairs for o
    #

    listify: (o) -> module.exports.toplevel require('./collect') o
