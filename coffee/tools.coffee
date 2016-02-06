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
     0000000  00     00  00000000   00000000    0000000   000000000  000   000
    000       000   000  000   000  000   000  000   000     000     000   000
    000       000000000  00000000   00000000   000000000     000     000000000
    000       000 0 000  000        000        000   000     000     000   000
     0000000  000   000  000        000        000   000     000     000   000
    ###
    #
    # accepts  two keypath arrays
    # returns  0 if they are equal
    #          1 if a is larger than b
    #         -1 if a is smaller than b
    
    cmppath: (a, b) ->
        al = a.length
        bl = b.length
        for i in [0...Math.min al, bl]
            if a[i] > b[i] then return  1
            if a[i] < b[i] then return -1
        if al > bl then return  1
        if al < bl then return -1
        0

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

    sortpath: (l) -> l.sort (a,b) -> module.exports.cmppath a[0], b[0]

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
