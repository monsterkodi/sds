###
 0000000  0000000     0000000
000       000   000  000     
0000000   000   000  0000000 
     000  000   000       000
0000000   0000000    0000000 
###

# ▸start 'sds'

noon   = require 'noon'
slash  = require 'path'
fs     = require 'fs'
karg   = require 'karg'
find   = require './find'
kolor  = require('klor').kolor
kolor.globalize()

#  0000000   00000000    0000000    0000000
# 000   000  000   000  000        000     
# 000000000  0000000    000  0000  0000000 
# 000   000  000   000  000   000       000
# 000   000  000   000   0000000   0000000 

args = karg """
sds
    file        . ? the file to search in           . *   . = package.json
    key         . ? key to search            
    value       . ? value to search
    path        . ? path to search           
    format      . ? result format
    set         . ? set values 
    save        . ? write result back to input file . - S . = false 
    output      . ? the file to write or stdout     . - F     
    json        . ? parse as json                         . = false
    noon        . ? parse as noon                         . = false
    yaml                                                  . = false
    object                                                . = false
    result                                                . = false
    colors      . ? output with ansi colors               . = false
    
format
    @k  key
    @v  value
    @o  object
    @p  path
        
shortcuts 
    -o  for -f @o
    -r  for -f @v and no leading empty line

version     #{require("#{__dirname}/../package.json").version}
"""

# 00000000  00000000   00000000    0000000   00000000 
# 000       000   000  000   000  000   000  000   000
# 0000000   0000000    0000000    000   000  0000000  
# 000       000   000  000   000  000   000  000   000
# 00000000  000   000  000   000   0000000   000   000

error = (msg) ->
    log ("\n"+msg+"\n").red
    process.exit()

if not args.file?
    if fs.existsSync './package.json'
        args.file = './package.json'
    else if fs.existsSync './package.noon'
        args.file = './package.noon'
    else
        error 'no input file provided!'
else if not fs.existsSync args.file
    argsFile = args.file
    if !args.value? and !args.key? and !args.path?    
        for file in ['./package.json', './package.noon']
            if fs.existsSync file
                args.result = true
                args.path   = argsFile
                args.file   = file
                break
    if argsFile == args.file
        error "can't find file: #{bold yellow args.file}"

colors = args.colors

# 00000000  000   000  000000000  000   000   0000000   00     00  00000000
# 000        000 000      000     0000  000  000   000  000   000  000     
# 0000000     00000       000     000 0 000  000000000  000000000  0000000 
# 000        000 000      000     000  0000  000   000  000 0 000  000     
# 00000000  000   000     000     000   000  000   000  000   000  00000000

extname =     
    if      args.json then '.json'
    else if args.noon then '.noon'
    else if args.yaml then '.yaml'
    else
        slash.extname args.file
    
if extname not in noon.extnames
    error "unknown file type: #{bold yellow extname}. use --json --noon or --yaml to force parsing."

outext = extname
if args.output in noon.extnames
    outext = args.output
    delete args.output

# 000       0000000    0000000   0000000  
# 000      000   000  000   000  000   000
# 000      000   000  000000000  000   000
# 000      000   000  000   000  000   000
# 0000000   0000000   000   000  0000000  

data = noon.load args.file, extname

if not (data.constructor.name in ['Array', 'Object'])
    error "no structure in file: #{bold yellow args.file}"

#  0000000   000   000  000000000
# 000   000  000   000     000   
# 000   000  000   000     000   
# 000   000  000   000     000   
#  0000000    0000000      000   

colors = false if args.output? or args.save

out = (s) ->
    
    outfile = args.output ? (args.file if args.save)
    
    if outfile?
        fs.mkdirSync slash.dirname(outfile), recursive:true
        try
            fs.writeFile outfile, s, 'utf8', (err) ->
                if err
                    error "can't write #{bold yellow outfile}: #{err}"
                else
                    log gray "wrote #{bold white outfile}"
        catch err
            error "can't write #{bold yellow outfile}: #{err}"
    else
        log s

if args.set?
    
    #  0000000  00000000  000000000
    # 000       000          000   
    # 0000000   0000000      000   
    #      000  000          000   
    # 0000000   00000000     000   
    
    set = require './set'
    
    for p,v of noon.parse args.set
        set data, p, v
        
    out noon.stringify data, colors:colors, ext:outext
        
else if not args.key? and not args.value? and not args.path?

    # 000      000   0000000  000000000
    # 000      000  000          000   
    # 000      000  0000000      000   
    # 000      000       000     000   
    # 0000000  000  0000000      000   
    
    s = noon.stringify data, colors:colors, ext:outext
    out '\n'+s+'\n'
    
else      
    
    #  0000000  00000000   0000000   00000000    0000000  000   000
    # 000       000       000   000  000   000  000       000   000
    # 0000000   0000000   000000000  0000000    000       000000000
    #      000  000       000   000  000   000  000       000   000
    # 0000000   00000000  000   000  000   000   0000000  000   000
      
    get = require './get'
      
    if not args.result
        log ''
        
    result = 
        if args.path? and args.value?
            find.pathValue data, args.path, args.value
        else if args.path?
            find.path data, args.path
        else if args.key? and args.value?
            find.keyValue data, args.key, args.value
        else if args.key?
            find.key data, args.key
        else
            find.value data, args.value
                    
    if args.object or args.result or args.format
        for path in result
            p = path.join '.'
            k = path[path.length-1]
            v = get data, path

            if args.object
                path.pop()
                s = noon.stringify get(data, path), colors:colors
            else if args.result
                s = noon.stringify v, colors: colors
            else if args.format
                s = args.format
                s = s.replace '@k', k
                s = s.replace '@p', p
                s = s.replace '@v', noon.stringify v, colors:colors
                if args.format.indexOf('@o') >= 0
                    path.pop()
                    if path.length
                        o = noon.stringify get(data, path), colors:colors
                    else
                        o = noon.stringify data, colors:colors
                    s = s.replace '@o', o
            else
                o = {}
                o[p] = v
                s = noon.stringify o, colors:colors
            out s
    else
        o = {}
        for path in result
            o[path.join('.')] = get data, path
        s = noon.stringify o, colors:colors
        out s
        
    if not args.result
        out ''

# ▸end 'sds'
