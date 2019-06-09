###
 0000000  000000000  00000000   000  000   000   0000000   000  00000000  000   000
000          000     000   000  000  0000  000  000        000  000        000 000 
0000000      000     0000000    000  000 0 000  000  0000  000  000000      00000  
     000     000     000   000  000  000  0000  000   000  000  000          000   
0000000      000     000   000  000  000   000   0000000   000  000          000   
###

stringify = (data, options={}) ->
    
    opt = Object.assign {}, options
    opt.ext ?= '.noon'
    opt.indent ?= '    '
    if opt.ext in noon.extnames
        require('noon').stringify data, opt

module.exports = stringify
