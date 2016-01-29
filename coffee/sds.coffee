###
 0000000  0000000     0000000
000       000   000  000     
0000000   000   000  0000000 
     000  000   000       000
0000000   0000000    0000000 
###

_      = require 'lodash'
fs     = require 'fs'
path   = require 'path'
colors = require 'colors'
noon   = require 'noon'
get    = require './get'
find   = require './find'
log    = console.log

args = require('karg') """
sds
    file        . ? the file to search in    . * . = package.json
    key         . ? key to search            
    value       . ? value to search
    path        . ? path to search           
    format      . ? output format            
    json        . ? parse as json            . = false
    noon        . ? parse as noon            . = false
    cson        . - C                        . = false
    yaml                                     . = false
    object                                   . = false
    result                                   . = false
    colors      . ? output with ansi colors  . = true
    
format
    @k  key
    @v  value
    @o  object
    @p  path
    
shortcuts 
    -o  for @o
    -r  for @v and no leading empty line

version     #{require("#{__dirname}/../package.json").version}
"""

err = (msg) ->
    log ("\n"+msg+"\n").red
    process.exit()

if not args.file?
    if fs.existsSync './package.json'
        args.file = './package.json'
    else
        err 'no input file provided!'
else if not fs.existsSync args.file
    err "can't find file: #{args.file.yellow.bold}"

extname =     
    if      args.json then '.json'
    else if args.cson then '.cson'
    else if args.noon then '.noon'
    else if args.yaml then '.yaml'
    else
        path.extname args.file
    
if extname not in ['.json', '.cson', '.plist', '.noon', '.yml', '.yaml']
    err "unknown file type: #{extname.yellow.bold}. use --json --cson --noon or --yaml to force parsing."

data = noon.load args.file

if not (data.constructor.name in ['Array', 'Object'])
    err "no structure in file: #{args.file.yellow.bold}"
    
if args.colors
    colors = 
        key:     colors.gray
        path:    colors.bold.gray
        null:    colors.bold.blue
        string:  colors.yellow
        value:   colors.bold.magenta
else
    colors = 
        key:     (s)->s
        path:    (s)->s
        value:   (s)->s
        string:  (s)->s
        null:    (s)->s
    
if not args.key? and not args.value? and not args.path?
    s = noon.stringify data, colors: colors
    log ''
    log s
    log ''
else        
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
            k = _.last path
            v = get data, path

            if args.object
                path.pop()
                s = noon.stringify get(data, path), colors: colors
            else if args.result
                s = noon.stringify v, colors: colors
            else if args.format
                s = args.format
                s = s.replace '@k', colors.key k
                s = s.replace '@p', colors.path p
                s = s.replace '@v', noon.stringify v, colors: colors
                if args.format.indexOf('@o') >= 0
                    path.pop()
                    o = noon.stringify get(data, path),
                        colors: true
                    s = s.replace '@o', o
            else
                o = {}
                o[p] = v
                s = noon.stringify o, colors: colors
            log s
    else
        o = {}
        for path in result
            o[path.join('.')] = get data, path
        s = noon.stringify o, colors: colors
        log s
        
    if not args.result
        log ''
