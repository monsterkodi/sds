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
    it 'should implement set',              -> _.isFunction(sds.set         ).should.be.true
    it 'should implement regexp',           -> _.isFunction(sds.regexp      ).should.be.true

###
 0000000   00000000  000000000
000        000          000   
000  0000  0000000      000   
000   000  000          000   
 0000000   00000000     000   
###

describe 'get', ->
    
    it 'should get an existing value', ->
        
        expect sds.get a:1, ['a']
        .to.eql 1

        expect sds.get a:b:c:3, 'a.b.c'
        .to.eql 3

    it 'should get an existing list item', ->
        
        expect sds.get [1,2,3], ['1']
        .to.eql 2

        expect sds.get [1,[2,3]], [1,1]
        .to.eql 3

    it 'should get an existing value by string keypath', ->

        expect sds.get [1,a:2,3], '0'
        .to.eql 1
        
        expect sds.get [1,a:2,3], '1.a'
        .to.eql 2

        expect sds.get [1,[2,[3,4]]], '1.1.1'
        .to.eql 4

        expect sds.get a:b:[c:[0,1]], 'a.b.0.c.1'
        .to.eql 1

    it 'should return undefined for values not found', ->
        
        expect sds.get [1,a:2,3], '1.b'
        .to.eql undefined

        expect sds.get [1,2,3], '4'
        .to.eql undefined

        expect sds.get [1,2,3], '-4'
        .to.eql undefined

        expect sds.get a:b:c:[0,1], 'a.0'
        .to.eql undefined

        expect sds.get a:b:c:[0,1], 'a.b.c.2'
        .to.eql undefined
        
###
 0000000  00000000  000000000
000       000          000   
0000000   0000000      000   
     000  000          000   
0000000   00000000     000   
###

describe 'set', ->
    
    it 'should overwrite an existing value', ->
        
        expect sds.set a:1, ['a'], 2
        .to.eql a:2

    it 'should handle array indices', ->
        
        expect sds.set a: [1,0,3], ['a', 1], 2
        .to.eql a:[1,2,3]

        expect sds.set a: [1,0,3], ['a', '1'], 2
        .to.eql a:[1,2,3]

        expect sds.set [1,0,3], [1], 2
        .to.eql [1,2,3]

        expect sds.set [1,0,3], ['1'], 2
        .to.eql [1,2,3]

        expect sds.set [1,5,3,0], [0], 9
        .to.eql [9,5,3,0]

        expect sds.set [1,5,3,0], ['0'], 9
        .to.eql [9,5,3,0]

        expect sds.set a: [1,0,3], ['a', 1], 'x'
        .to.eql a:[1,'x',3]

        expect sds.set a: [1,0,3], ['a', '1'], 'x'
        .to.eql a:[1,'x',3]
        
    it 'should accept string keypaths', ->
        
        expect sds.set a: [1,0,3], 'a.1', 2
        .to.eql a:[1,2,3]

        expect sds.set [1,0,3], '1', 2
        .to.eql [1,2,3]

        expect sds.set [1,5,3,0], '0', 9
        .to.eql [9,5,3,0]

        expect sds.set a: [1,0,3], 'a.1', 'x'
        .to.eql a:[1,'x',3]

        expect sds.set a: '1': 'y', 'a.1', 'x'
        .to.eql a: '1': 'x'

        expect sds.set a: '1': 'y', 'a.2', 'x'
        .to.eql 
            a: 
                '1': 'y'
                '2': 'x'
        
    it 'should create objects on the fly', ->

        expect sds.set {}, 'a.b.c', true
        .to.eql a: b: c: true
        
        expect sds.set a: null, 'a.b.c', true
        .to.eql a: b: c: true

    it 'should create arrays on the fly', ->
        
        expect sds.set [0], '1.0.0', true
        .to.eql [0,[[true]]]

        expect sds.set [], '0.0.0', true
        .to.eql [[[true]]]

    it 'should not change the nature of object on the fly', ->
        
        expect sds.set [0,1,2], '1.0', true
        .to.eql [0,1,2]

        expect sds.set [0,1,2], '1', []
        .to.eql [0,[],2]

        expect sds.set [0,['bla'],2], '1.0', 1
        .to.eql [0,[1],2]

        expect sds.set [0,['bla'],2], '1.0.2', 1
        .to.eql [0,['bla'],2]
                
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
 0000000   0000000   000      000      00000000   0000000  000000000
000       000   000  000      000      000       000          000   
000       000   000  000      000      0000000   000          000   
000       000   000  000      000      000       000          000   
 0000000   0000000   0000000  0000000  00000000   0000000     000   
###

describe 'collect', ->
    
    o = 
        a: 1
        b: 
            d: 2
        c:
            d: 3
        d: 4
    
    it 'should filter path', ->
        expect sds.collect o, (p, k, v) -> p[0] == 'a'
        .to.eql [[['a'], 1]]

        expect sds.collect o, (p, k, v) -> _.isEqual ['b', 'd'], p
        .to.eql [[['b', 'd'], 2]]

    it 'should filter key', ->
        expect sds.collect o, (p, k, v) -> k == 'd'
        .to.eql [[['b', 'd'], 2], [['c', 'd'], 3], [['d'], 4]]

    it 'should filter value', ->
        expect sds.collect o, (p, k, v) -> v <= '2'
        .to.eql [[['a'], 1], [['b', 'd'], 2]]

    it 'should filter path value', ->

        expect sds.collect o, (p, k, v) -> p.length == 1 and _.isNumber v
        .to.eql [[['a'], 1], [['d'], 4]]

    it 'should filter key value', ->

        expect sds.collect o, (p, k, v) -> k == 'd' and v > 3
        .to.eql [[['d'], 4]]

    it 'should map results', ->
        expect sds.collect o, null, (p, v) -> v
        .to.eql [1, d: 2, 2, d: 3, 3, 4]
        
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
