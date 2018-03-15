###
 0000000  000000000  00000000   000  000   000   0000000   000  00000000  000   000
000          000     000   000  000  0000  000  000        000  000        000 000 
0000000      000     0000000    000  000 0 000  000  0000  000  000000      00000  
     000     000     000   000  000  000  0000  000   000  000  000          000   
0000000      000     000   000  000  000   000   0000000   000  000          000   
###

{ _ } = require 'kxk'

defaults = 
    ext: '.noon'
    indent: '    '

stringify = (data, options={}) ->
    opt = _.assign _.clone(defaults), options
    switch opt.ext
        when '.json'  then JSON.stringify data, null, opt.indent
        when '.cson'  then require('cson').stringify data, null, opt.indent
        when '.noon'  then require('noon').stringify data, opt
        when '.plist' then require('simple-plist').stringify data
        when '.yml', '.yaml' then require('js-yaml').dump data

module.exports = stringify
