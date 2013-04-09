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
          'app/templates/*.hbs'
        ],
        tasks: ['ember_templates','livereload']
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
          return sourceFile.replace(/app\/templates\//, '');
        }
      },
      'app/dependencies/compiled/templates.js' : ['app/templates/**/*.hbs']
    },

    neuter: {
      options: {
        includeSourceURL: true,
        filepathTransform: function(filepath) { return 'app/' + filepath; }
//        template: "{%= src %}"
      },
      'build/application.js' : 'app/app.js'
    },

    open: {
      server: {
        url: 'http://localhost:<%= connect.livereload.options.port %>'
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

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('test', ['mochacli']);

  grunt.registerTask('server', [
      'ember_templates',
      'neuter',
      'livereload-start',
      'connect:livereload',
      'open',
      'mochacli',
      'watch'
  ]);

};
