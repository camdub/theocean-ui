'use strict';

var modRewrite = require('connect-modrewrite');
var connect = require('connect');

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        livereload: true,
      },
      js: {
        files: [
          'build/index.html',
          'app/dependencies/**/*.js',
          'app/**/*.js'
        ],
        tasks: ['neuter', 'jshint', 'test:unit']
      },
      templates: {
        files: [
          'app/js/templates/**/*.hbs'
        ],
        tasks: ['ember_templates']
      },
      css: {
        files: ['app/sass/*.scss'],
        tasks: ['sass']
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: 'build',
          middleware: function(connect, options) {
            return [
              modRewrite([
                '!\\.js|\\.css$ /index.html [L]',
                '^/.*/.*$ /index.html',
                '^/.*$ /index.html'
              ],[]),
              connect.static(options.base)
            ];
          }
        },
      }
    },

    ember_templates: {
      options: {
        templateName: function(sourceFile) {
          return sourceFile.replace(/app\/js\/templates\//, '');
        }
      },
      'app/dependencies/compiled/templates.js' : ['app/js/templates/**/*.hbs']
    },

    neuter: {
      options: {
        includeSourceURL: true,
        filepathTransform: function(filepath) { return 'app/js/' + filepath; },
        template: "{%= src %}"
      },
      'build/application.js' : 'app/js/app.js'
    },

    sass: {
      dist: {
        files: {
          'build/application.css' : 'app/sass/application.scss'
        }
      }
    },

    /* Runs all .html files in the test dir through PhantomJS and prints
       results in the terminal
     */
    qunit: {
      all: ['test/**/*.html']
    },

    /* Finds all <name>_test.js files in the test folder load them into
     * the test runner via the custom task below
     */
    build_test_runner_file: {
      all: ['test/support/test_helper.js', 'test/**/*_test.js'],
      unit: ['test/support/test_helper.js', 'test/models/*_test.js']
    },

    jshint: {
      all: ['app/js/**/*.js', 'test/**/*.js', '!test/support/*.*'],
      options: {
        jshintrc: '.jshintrc',
        force: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-devtools');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerMultiTask('build_test_runner_file', 'Creates a test runner file', function() {
    var tmpl = grunt.file.read('test/support/runner.html.tmpl');
    var context = {
      data: {
        files: this.filesSrc.map(function(fileSrc) {
          return fileSrc.replace('test/', '');
        })
      }
    };
    grunt.file.write('test/runner.html', grunt.template.process(tmpl, context));
  });

  grunt.registerTask('test:unit', ['build_test_runner_file:unit', 'qunit']);
  grunt.registerTask('test', ['ember_templates','neuter', 'build_test_runner_file:all', 'qunit']);

  grunt.registerTask('server', [
      'ember_templates',
      'neuter',
      'sass',
      'jshint',
      'test:unit',
      'connect:server',
      'watch'
  ]);

  grunt.registerTask('default', ['server']);

};
