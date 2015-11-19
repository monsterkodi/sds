###
 0000000  0000000     0000000
000       000   000  000     
0000000   000   000  0000000 
     000  000   000       000
0000000   0000000    0000000 
###

log   = require './log'
find  = require './find'
path  = require 'path'
_     = require 'lodash'
fs    = require 'fs'
chalk = require 'chalk'

nomnom = require("nomnom")
args = nomnom
   .script("sds")
   .options
      file:
         position: 0
         help: "the file to search in"
         list: false
         required: false
      key:    { abbr: 'k', help: 'key to search' }
      value:  { abbr: 'v', help: 'value to search' }
      path:   { abbr: 'p', help: 'path to search' }
      format: { abbr: 'f', help: 'output format' }
      json:   { abbr: 'j', help: 'parse as json', flag: true }
      cson:   { abbr: 'c', help: 'parse as cson', flag: true }
   .help chalk.blue("Format:\n") + """
    \   #k key
    \   #v value
    \   #o object
    \   #p path
    \t 
    \   default format is "#p: #v"
   """
   .parse()

err = (msg) ->
    log chalk.red("\n"+msg+"\n")
    process.exit()

if not args.file?
    log nomnom.getUsage()
    err "no input file provided!"

if not fs.existsSync args.file
    log nomnom.getUsage()
    err "can't find file: #{chalk.yellow.bold(args.file)}"

extname =     
    if args.json?
        ".json"
    else if args.cson?
        ".cson"
    else
        path.extname args.file
    
if extname not in ['.json', '.cson']
    err "unknown file type: #{chalk.yellow.bold(extname)}. use --json or --cson to force parsing."

str = fs.readFileSync args.file

if str.length <= 0
    err "empty file: #{chalk.yellow.bold(args.file)}"

switch extname
    when '.json' then data = JSON.parse str
    when '.cson' then data = require('cson').parse str

if not (data.constructor.name in ['Array', 'Object'])
    err "no structure in file: #{chalk.yellow.bold(args.file)}"
    
result = 
    if not args.file? or not args.key? and not args.value? and not args.path?
        _.keysIn(data).map (i) -> [i]
    else if args.path?
        find.path data, args.path
    else if args.key? and args.value?
        find.keyValue data, args.key, args.value
    else if args.key?
        find.key data, args.key
    else
        find.value data, args.value
        
for path in result
    p = chalk.gray.bold(path.join('.'))  
    k = chalk.magenta.bold(_.last path)
    value = find.keyPath(data, path)
    if value?.constructor.name in ['Array', 'Object']
        value = JSON.stringify value, null, '  '
    v = chalk.yellow.bold(value)
    if args.format
        s = args.format
        s = s.replace '#k', k
        s = s.replace '#p', p
        s = s.replace '#v', v
        if args.format.indexOf('#o') >= 0
            path.pop()
            o = JSON.stringify find.keyPath(data, path), null, '  '
            s = s.replace '#o', o
    else
        s = "#{p}: #{v}"
    log chalk.gray s
