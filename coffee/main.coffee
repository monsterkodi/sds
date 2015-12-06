###
00     00   0000000   000  000   000
000   000  000   000  000  0000  000
000000000  000000000  000  000 0 000
000 0 000  000   000  000  000  0000
000   000  000   000  000  000   000
###

module.exports = 
    extnames: ['.json', '.cson', '.noon', '.plist', '.yml', '.yaml']
    load: require './load'
    find: require './find'
