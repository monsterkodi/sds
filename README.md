# sds
### structured data search

![sds](https://raw.githubusercontent.com/monsterkodi/sds/master/img/sds.png)

### suche die struktur

```coffee-script
sds = require 'sds'

# test against sds.extnames [list of supported file extensions]

if path.extname(infile) in sds.extnames

    # load object from file
    
    obj = sds.load infile

    # find something ...
    
    sds.find.value     obj, '*value' 
    sds.find.key       obj, '*key' 
    sds.find.path      obj, '*path' 
    sds.find.keyValue  obj, '*key',  '*value'
    sds.find.pathValue obj, '*path', '*value'
    
    # all find methods return a list of keypaths
    # each keypath is in itself a list of strings
    #
    # use sds.get to retrieve the value at a keypath
    
    sds.get obj, keypath

    # use stringify to convert to any of the supported formats
    
    sds.stringify obj, ext: '.yaml'
    
    # or save to disk (format is deduced from extension)
    
    sds.save outfile, obj
    
    # happy searching :-)
```
