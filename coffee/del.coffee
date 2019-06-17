###
0000000    00000000  000      
000   000  000       000      
000   000  0000000   000      
000   000  000       000      
0000000    00000000  0000000  
###

# accepts an object and a keypath as an array or string
# returns the object with value removed at keypath

del = (object, keypath) ->
    
    keypath = keypath.split '.' if typeof(keypath) == 'string'
    throw "invalid keypath: #{JSON.stringify keypath}" if not (keypath instanceof Array)
    
    kp = [].concat keypath
    o = object
    
    while kp.length > 1
        k = kp.shift()
        o = o[k]
        if not o then break
            
    if kp.length == 1 and o?
        if o instanceof Array
            o.splice parseInt kp[0]
        else if o instanceof Object
            delete o[kp[0]]
    object

module.exports = del
