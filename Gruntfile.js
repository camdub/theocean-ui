'use strict';

var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      js: {
        files: [
          'build/index.html',
          'app/dependencies/**/*.js',
          'app/**/*.js'
        ],
        tasks: ['neuter', 'livereload']
      },
      templates: {
        files: [
          'app/js/templates/**/*.hbs'
        ],
        tasks: ['ember_templates','livereload']
      },
      css: {
        files: ['app/sass/*.scss'],
        tasks: ['sass','livereload']
      }
    },

    livereload: {
      port: 35729 // default livereload listening port
    },
    connect: {
      livereload: {
        options: {
          port: 9001,
          middleware: function(connect, options) {
            console.log(options.base + '/');
            return [lrSnippet, folderMount(connect, options.base + '/build')];
          }
        }
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

    open: {
      server: {
        url: 'http://localhost:<%= connect.livereload.options.port %>'
      }
    },

    sass: {
      dist: {
        files: {
          'build/application.css' : 'app/sass/application.scss'
        }
      }
    },

    mochacli: {
      options: {
        reporter: 'spec'
      },
      all: ['test/*_spec.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-devtools');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('test', ['mochacli']);

  grunt.registerTask('server', [
      'ember_templates',
      'neuter',
      'sass',
      'livereload-start',
      'connect:livereload',
      'mochacli',
      'watch'
  ]);

};
