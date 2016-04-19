module.exports = function(grunt) {

  grunt.initConfig({
    // Task configuration here

    // cleaning directories
    clean: {
      dev: ['dev']
    },

    // copy files
    copy: {
      dev: {expand: true, cwd: 'app/', src: ['**'], dest: 'dev/'},
      bowerDev: {expand: true, cwd: 'bower_components/', src: ['**'], dest: 'dev/bower_components'}
    },

    // link bower components in html
    wiredep: {
      target: {
        src: 'dev/index.html' // point to your HTML file.
      }
    },

    // compile sass
    sass: {
      dev: {
        files: {
          'dev/styles/style.css': 'dev/styles/style.scss'
        }
      }
    },

    // include js and css files in index.html
    includeSource: {
      options: {
        basePath: 'dev'
      },
      myTarget: {
        files: {
          'dev/index.html': 'dev/index.html'
        }
      }
    },

    // start webserver
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'dev',
          livereload: 35729,
          open: true, // open default browser
          useAvailablePort: true
        }
      }
    },

    // watch for filechanges and run tasks
    watch: {
      styles: {
        files: ['app/styles/{,*/}*.scss'],
        tasks: ['clean:dev', 'copy:dev',
          'copy:bowerDev', 'wiredep', 'sass:dev', 'includeSource'],
        options: {
          livereload: true,
        }
      }
    }


  });

  // loading required tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-include-source');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // bundeling tasks - default is used when ’$ grunt'
  grunt.registerTask('default', ['clean:dev', 'copy:dev',
    'copy:bowerDev', 'wiredep', 'sass:dev', 'includeSource', 'connect:server',
    'watch:styles' ]);

};
