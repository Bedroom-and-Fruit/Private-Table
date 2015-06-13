module.exports = function (grunt) {

  grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
            'app/scripts/*.js',
            'app/scripts/**/*.js'
        ],
        dest: 'app/build/production.js'
      }
    },

    nodemon: {
      dev: {
        script: 'server/app.js'
      }
    },

    uglify: {
      build: {
        src: 'app/build/production.js',
        dest: 'app/build/production.min.js'
      }
    },

    jshint: {
      files: [
          'app/scripts/**/*.js',
          'app/scripts/*.js'
        // 'app/*.js',
        // 'app/collections/*.js',
        // 'app/models/*.js',
        // 'lib/*.js',
        // 'public/client/*.js',
        // 'public/lib/*.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [

        ]
      }
    },

    cssmin: {
    },

    watch: {
      scripts: {
        files: [
          'app/scripts/**/*.js',
          'app/scripts/*.js'
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },

      css: {
        files: 'app/styles/*.css',
        tasks: ['cssmin']
      }
    }

    /*shell: {
        prodServer: {
          command: [
              'git add .',
              'git commit -m "azure deploy"',
              'git push azure master'
          ].join(' && '),
          options: {
            stdout: true, 
            stderr: true,
            failOnError: true
          }
        }
    }*/
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  /*grunt.loadNpmTasks('grunt-shell');*/
  grunt.loadNpmTasks('grunt-nodemon');

  /*grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });*/

  //////////////////////////////////////////////////
  //Main grunt tasks
  //////////////////////////////////////////////////

  

  grunt.registerTask('build', ['concat', 'uglify']);

 /* grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // add your production server task here
      grunt.task.run([ 'shell' ]);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  }); 
  grunt.registerTask('deploy', [ 'build', 'upload' ]);*/



  grunt.registerTask('default', [
    'jshint',
    'build',
    'nodemon'
  ]);
 };

 
    










