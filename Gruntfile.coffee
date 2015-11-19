
module.exports = (grunt) ->

    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'

        salt:
            options:
                verbose: true
            coffee:
                files:
                    'asciiText':   ['**/*.coffee']

        sugar:
            version:
                src:  'publish'
                dest:  '.publish'

        watch:
          sources:
            files: ['*.coffee', 'coffee/**.coffee']
            tasks: ['build']

        bumpup:
            file: 'package.json'

        shell:
            publish:
                command: '/usr/bin/env bash .publish'
            open:
                command: 'open https://www.npmjs.com/package/sds'

    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-bumpup'
    grunt.loadNpmTasks 'grunt-pepper'
    grunt.loadNpmTasks 'grunt-shell'

    grunt.registerTask 'build',     [ 'salt' ]
    grunt.registerTask 'default',   [ 'build' ]
    grunt.registerTask 'publish',   [ 'bumpup', 'build', 'sugar:version', 'shell:publish', 'shell:open' ]
