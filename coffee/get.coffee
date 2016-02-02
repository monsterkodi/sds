###
 0000000   00000000  000000000
000        000          000   
000  0000  0000000      000   
000   000  000          000   
 0000000   00000000     000   
###
_ = require 'lodash'
###
# accepts an object and a keypath
# returns the value at keypath or undefined
###

get = (object, keypath) ->
    kp = _.clone keypath
    while kp.length
        object = object[kp.shift()]
        return null if object == null 
        return undefined if not object?
    object

module.exports = get
