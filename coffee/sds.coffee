###
 0000000  0000000     0000000
000       000   000  000     
0000000   000   000  0000000 
     000  000   000       000
0000000   0000000    0000000 
###

_     = require 'lodash'
fs    = require 'fs'
path  = require 'path'
chalk = require 'chalk'
nom   = require 'nomnom'
log   = require './log'
find  = require './find'
load  = require './load'

args = nom
   .script 'sds'
   .options
      file:
         position: 0
         help: 'the file to search in'
         list: false
         required: false
      key:     { abbr: 'k',  help: 'key to search' }
      value:   { abbr: 'v',  help: 'value to search' }
      path:    { abbr: 'p',  help: 'path to search' }
      format:  { abbr: 'f',  help: 'output format' }
      object:  { abbr: 'o',  help: 'output the object', flag: true, hidden: true }
      result:  { abbr: 'r',  help: 'output the value',  flag: true, hidden: true }
      json:    { abbr: 'j',  help: 'parse as json', flag: true }
      cson:    { abbr: 'c',  help: 'parse as cson', flag: true }
      noon:    { abbr: 'n',  help: 'parse as noon', flag: true }
      yml:     { abbr: 'y',  help: 'parse as yml',  flag: true }
      version: { abbr: 'V',  help: 'output version', flag: true, hidden: true }
   .help chalk.blue("Format:\n") + """
    \   #k key
    \   #v value
    \   #o object
    \   #p path
    \t 
    \   default format is "#p: #v"
    \t
    \   shortcuts: -o for "#o"
    \              -r for "#v"
    \t  
   """
   .parse()

err = (msg) ->
    log chalk.red("\n"+msg+"\n")
    process.exit()

if args.version
    cp = require 'child_process'
    log String cp.execSync "#{__dirname}/../bin/sds #{__dirname}/../package.json -k version -r"
    process.exit()

if not args.file?
    if fs.existsSync './package.json'
        args.file = './package.json'
    else
        log nomnom.getUsage()
        err 'no input file provided!'
else if not fs.existsSync args.file
    log nomnom.getUsage()
    err "can't find file: #{chalk.yellow.bold(args.file)}"

extname =     
    if      args.json? then '.json'
    else if args.cson? then '.cson'
    else if args.noon? then '.noon'
    else if args.yml?  then '.yml'
    else
        path.extname args.file
    
if extname not in ['.json', '.cson', '.plist', '.noon', 'yml']
    err "unknown file type: #{chalk.yellow.bold(extname)}. use --json --cson --noon or --yml to force parsing."

data = load args.file

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
    if args.object
        path.pop()
        s = JSON.stringify find.keyPath(data, path), null, '  '
    else if args.result
        s = "#{v}"
    else if args.format
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
