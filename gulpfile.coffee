del      = require 'del'
path     = require 'path'
gulp     = require 'gulp'
coffee   = require 'gulp-coffee'
pepper   = require 'gulp-pepper'
salt     = require 'gulp-salt'
gutil    = require 'gulp-util'
bump     = require 'gulp-bump'
debug    = require 'gulp-debug'
plumber  = require 'gulp-plumber'
 
onError = (err) -> gutil.log err

gulp.task 'coffee', ['salt'], ->
    gulp.src ['coffee/**/*.coffee'], base: '.'
        .pipe plumber()
        # .pipe debug title: 'coffee'
        .pipe pepper
            stringify: (info) -> '"'+info.class + info.type + info.method + ' ► "'
            paprika: 
                dbg: 'log'
        .pipe coffee(bare: true).on('error', onError)
        .pipe gulp.dest 'js/'
    
gulp.task 'salt', ->
    gulp.src ['coffee/**/*.coffee'], base: '.'
        .pipe plumber()
        # .pipe debug title: 'salt'
        .pipe salt()
        .pipe gulp.dest '.'

gulp.task 'clean', (cb) ->
    del [
        'js'
    ]
    cb()

gulp.task 'bump', (cb) ->
    gulp.src './package.json'
        .pipe bump()
        .pipe gulp.dest '.'
    cb()

gulp.task 'release', ['clean', 'bump', 'coffee'], ->

gulp.task 'default', ->
                
    gulp.watch ['coffee/**/*.coffee'], ['coffee']
