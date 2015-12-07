path = require 'path'
sds = require '.'

infile = 'package.json'
outfile = 'package.noon'

if path.extname(infile) in sds.extnames

    obj = sds.load infile

    for keypath in sds.find.value obj, '^**' 
        
        sds.get obj, keypath

    # if path.extname(outfile) in sds.extnames
    # 
    #     str = sds.stringify obj, ext: '.yaml'
    #     console.log str
    #     
    #     sds.save outfile, obj
