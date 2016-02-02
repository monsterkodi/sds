###
 0000000   00000000  000000000
000        000          000   
000  0000  0000000      000   
000   000  000          000   
 0000000   00000000     000   
###

_ = require 'lodash'

get = (node, keyPath) ->
    kp = _.clone keyPath
    while kp.length
        node = node[kp.shift()]
        return null if node == null 
        return undefined if not node?
    node

module.exports = get
