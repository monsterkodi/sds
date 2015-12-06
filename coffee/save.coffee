###
 0000000   0000000   000   000  00000000
000       000   000  000   000  000     
0000000   000000000   000 000   0000000 
     000  000   000     000     000     
0000000   000   000      0      00000000
###

fs    = require 'fs'
path  = require 'path'
toStr = require './stringify'

save = (p, data) ->
    
    fs.writeFileSync p, toStr data, ext: path.extname p

module.exports = save
