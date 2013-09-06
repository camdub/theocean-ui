'use strict';


var modRewrite = require('connect-modrewrite');
var connect = require('connect');
var fs = require('fs');
var url = require('url');

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
        tasks: ['neuter:dev', 'jshint', 'test:unit']
      },
      templates: {
        files: [
          'app/js/templates/**/*.hbs'
        ],
        tasks: ['ember_templates']
      },
      css: {
        files: ['app/sass/*.scss'],
        tasks: ['sass:dev']
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: 'build',
          middleware: middleware
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
      dev: {
        options: {
          filepathTransform: function(filepath) { return 'app/js/' + filepath; },
          template: "{%= src %}",
          includeSourceURL: true
        },
        files: {
          'build/application.js' : 'app/js/app.js'
        }
      },
      prod: {
        options: {
          filepathTransform: function(filepath) { return 'app/js/' + filepath; },
          template: "{%= src %}"
        },
        files: {
          'build/application.js' : 'app/js/app.js'
        }
      }
    },

    sass: {
      prod: {
        files: {
          'dist/application.css' : 'app/sass/application.scss'
        }
      },
      dev: {
        options: {
          trace: true,
          style: 'expanded',
          lineNumbers: true
        },
        files: {
          'build/application.css' : 'app/sass/application.scss'
        }
      }
    },

    uglify: {
      prod: {
        options: {
          mangle: false,
          report: 'min',
          preserveComments: false,
          banner: "/* The Ocean v0.1 by Pariveda Solutions */\n"
        },
        files: {
          'dist/application.min.js' : ['dist/application.js'],
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
        ignores: [ 'app/js/vendor' ],
        force: true
      }
    },

    'ftp-deploy': {
      build: {
        auth: {
          host: 'waws-prod-blu-001.ftp.azurewebsites.windows.net',
          port: 21,
          authKey: 'key1'
        },
        src: 'build',
        dest: '/site/wwwroot'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ftp-deploy');

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

  grunt.registerTask('create_dist_dir', 'Creates folder for production builds', function() {
    grunt.file.mkdir('./dist');
  });

  grunt.registerTask('test:unit', ['build_test_runner_file:unit', 'qunit']);
  grunt.registerTask('test', ['ember_templates','neuter', 'build_test_runner_file:all', 'qunit']);

  grunt.registerTask('server', [
      'ember_templates',
      'neuter:dev',
      'sass:dev',
      'jshint',
      'connect:server',
      'watch'
  ]);

  grunt.registerTask('build', [
    'ember_templates',
    'jshint',
    'create_dist_dir',
    'neuter:prod',
    'sass:prod',
    'uglify:prod' 
  ]);

  grunt.registerTask('deploy', ['neuter:prod', 'ember_templates', 'ftp-deploy']);

  grunt.registerTask('default', ['build']);

};

function middleware(connect, options) {
  return [
    connect['static'](options.base),
    connect.directory(options.base),
    // Remove this middleware to disable catch-all routing.
    buildWildcardMiddleware(options)
  ];
}

function wildcardResponseIsValid(request) {
  var urlSegments = request.url.split('.'),
      extension   = urlSegments[urlSegments.length-1];
  return (
    ['GET', 'HEAD'].indexOf(request.method.toUpperCase()) > -1 &&
    (urlSegments.length == 1 || extension.indexOf('htm') == 0 || extension.length > 5)
  );
}

function buildWildcardMiddleware(options) {
  return function(request, response, next) {
    if (!wildcardResponseIsValid(request)) { return next(); }

    var wildcard     = (options.wildcard || 'index.html'),
        wildcardPath = options.base + "/" + wildcard;

    fs.readFile(wildcardPath, function(err, data){
      if (err) { return next('ENOENT' == err.code ? null : err); }

      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(data);
    });
  };
}


