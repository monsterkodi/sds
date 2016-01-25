_      = require 'lodash'
assert = require 'assert'
chai   = require 'chai'
sds    = require '../'
expect = chai.expect
chai.should()

describe 'module interface', ->
    
    it 'should have a list of extnames',    -> _.isArray(sds.extnames       ).should.be.true
    it 'should have a list of extensions',  -> _.isArray(sds.extensions     ).should.be.true    
    it 'should implement stringify',        -> _.isFunction(sds.stringify   ).should.be.true
    it 'should implement load',             -> _.isFunction(sds.load        ).should.be.true
    it 'should implement save',             -> _.isFunction(sds.save        ).should.be.true
    it 'should implement find',             -> _.isFunction(sds.find        ).should.be.true
    it 'should implement get',              -> _.isFunction(sds.get         ).should.be.true
    it 'should implement regexp',           -> _.isFunction(sds.regexp      ).should.be.true
    it 'should implement diff',             -> _.isFunction(sds.diff        ).should.be.true

###
00000000  000  000   000  0000000  
000       000  0000  000  000   000
000000    000  000 0 000  000   000
000       000  000  0000  000   000
000       000  000   000  0000000  
###
describe 'find', ->

    it 'should implement key',           -> _.isFunction(sds.find.key       ).should.be.true    
    it 'should implement path',          -> _.isFunction(sds.find.value     ).should.be.true
    it 'should implement value',         -> _.isFunction(sds.find.path      ).should.be.true
    it 'should implement keyValue',      -> _.isFunction(sds.find.keyValue  ).should.be.true    
    it 'should implement pathValue',     -> _.isFunction(sds.find.pathValue ).should.be.true    

###
0000000    000  00000000  00000000
000   000  000  000       000     
000   000  000  000000    000000  
000   000  000  000       000     
0000000    000  000       000     
###
describe 'diff', ->
    
    it 'should implement three',         -> _.isFunction(sds.diff.three       ).should.be.true    

    c = 
        p:  [1,3]
        q:  
            x: 1
            y: 2
        r:  1
        s:  'sss'
        v:  0
        x:  8
        z:  7
        
    a =
        o:  1
        p:  [1,2,3]
        q:  
            x: 1
            y: 2
        r:  null
        s:  "s!s"
        t:  
            x: 1
            z: 3
        u:  
            x: 4
        x:  8
        y:  9
        z:  7
    
    b =
        p:  [1,3,2]
        q:  
            y: 2
            x: 1
        s:  "sss"
        t: 
            x: 'a'
            y: 2
        u:  
            x: 1
        y:  9
        x:  8
            
    it 'should output the difference', -> 
        expect sds.diff.three a, b, c
        .to.eql 
            a:  
                new:     [ 'o', 't', 'u' ]
                changed: [ 'p', 'r', 's' ]
                del:     [ 'v' ]
            b:  
                new:     [ 't', 'u' ]
                changed: [ 'p', 'r', 's' ]
                del:     [ 'v', 'z' ]
        
            
###
 0000000  000000000  00000000   000  000   000   0000000   000  00000000  000   000
000          000     000   000  000  0000  000  000        000  000        000 000 
0000000      000     0000000    000  000 0 000  000  0000  000  000000      00000  
     000     000     000   000  000  000  0000  000   000  000  000          000   
0000000      000     000   000  000  000   000   0000000   000  000          000   
###

describe 'stringify', ->

    o = a: 1, b: 2    
    it 'should output noon by default', -> 
        
        expect sds.stringify o
        .to.eql """
        a   1
        b   2
        """

    it 'should output noon', -> 
        
        expect sds.stringify o, ext: '.noon'
        .to.eql """
        a   1
        b   2
        """
        
    it 'should output json', -> 
        
        expect sds.stringify o, ext: '.json'
        .to.eql """
        {
            "a": 1,
            "b": 2
        }
        """

    it 'should output cson', -> 
        
        expect sds.stringify o, ext: '.cson'
        .to.eql """
        a: 1
        b: 2
        """

    it 'should output yaml', -> 
        
        expect sds.stringify o, ext: '.yaml'
        .to.eql """
        a: 1
        b: 2
        
        """
