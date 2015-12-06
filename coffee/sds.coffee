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
noon  = require 'noon'
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
      yaml:    { abbr: 'y',  help: 'parse as yaml', flag: true }
      colors:  { toggle: true, default: true, help: 'use ansi colors'}
      version: { abbr: 'V',  help: 'output version', flag: true, hidden: true }
   .help chalk.blue("Format:\n") + """
    \   #k key
    \   #v value
    \   #o object
    \   #p path
    \t 
    \   default format is "#p #v"
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
        log nom.getUsage()
        err 'no input file provided!'
else if not fs.existsSync args.file
    log nom.getUsage()
    err "can't find file: #{chalk.yellow.bold(args.file)}"

extname =     
    if      args.json? then '.json'
    else if args.cson? then '.cson'
    else if args.noon? then '.noon'
    else if args.yaml? then '.yaml'
    else
        path.extname args.file
    
if extname not in ['.json', '.cson', '.plist', '.noon', '.yml', '.yaml']
    err "unknown file type: #{chalk.yellow.bold(extname)}. use --json --cson --noon or --yaml to force parsing."

data = load args.file

if not (data.constructor.name in ['Array', 'Object'])
    err "no structure in file: #{chalk.yellow.bold(args.file)}"
    
if not args.key? and not args.value? and not args.path?
    s = noon.stringify data, colors: args.colors
    log args.colors and chalk.bold.yellow(s) or s
    log ''
else        
    result = 
        if args.path?
            find.path data, args.path
        else if args.key? and args.value?
            find.keyValue data, args.key, args.value
        else if args.key?
            find.key data, args.key
        else
            find.value data, args.value
        
    if args.object or args.result or args.format    
        log ''
        for path in result
            p = path.join '.'
            k = _.last path
            v = find.keyPath data, path

            if args.object
                path.pop()
                s = noon.stringify find.keyPath(data, path), colors: args.colors
            else if args.result
                s = "#{v}"
            else if args.format
                s = args.format
                s = s.replace '#k', args.colors and chalk.gray(k) or k
                s = s.replace '#p', args.colors and chalk.bold.gray(p) or p
                s = s.replace '#v', noon.stringify v, colors: args.colors
                if args.format.indexOf('#o') >= 0
                    path.pop()
                    o = noon.stringify find.keyPath(data, path),
                        colors: true
                    s = s.replace '#o', o
            else
                o = {}
                o[p] = v
                s = noon.stringify o, colors: args.colors
            log args.colors and chalk.bold.yellow(s) or s
    else
        o = {}
        for path in result
            o[path.join('.')] = find.keyPath data, path
        s = noon.stringify o, colors: args.colors
        log args.colors and chalk.bold.yellow(s) or s
        
    if not args.result
        log ''
