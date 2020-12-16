###
 0000000  00000000  000000000
000       000          000   
0000000   0000000      000   
     000  000          000   
0000000   00000000     000   
###

# accepts an object, a keypath as an array or string and a value
# returns the object with value set at keypath

set = (object, keypath, value) ->
    
    keypath = keypath.split '.' if typeof(keypath) == 'string'
    throw "invalid keypath: #{JSON.stringify keypath}" if not (keypath instanceof Array)
    
    kp = [].concat keypath
    
    if '__proto__' in keypath # let's try to make those security bots happy ...
        throw "__proto__ in keypath: #{JSON.stringify keypath}"
    
    o = object
        
    while kp.length > 1
        k = kp.shift()
        if not o[k]?
            if not Number.isNaN parseInt k
                o = o[k] = []
            else
                o = o[k] = {}
        else
            o = o[k]
            
    if kp.length == 1 and o?
        if value == undefined
            delete o[kp[0]]
        else
            o[kp[0]] = value
            if o[kp[0]] != value
                throw "couldn't set value #{JSON.stringify value} for keypath #{keypath.join '.'} in #{JSON.stringify object}"
    object

module.exports = set
