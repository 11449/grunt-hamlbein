/*
 * grunt-hamlbein
 * https://github.com/11449/grunt-hamlbein
 *
 * Copyright (c) 2014 Andreas Kürbis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    clean: {
      tests: ['tmp']
    },
    hamlbein: {
      simple: {
        files: [
          {
            src:  'test/fixtures/simple.haml',
            dest: 'tmp/simple.html'
          }
        ]
      },
      context: {
        files: [
          {
            src:  'test/fixtures/context.haml',
            dest: 'tmp/context.html'
          }
        ],
        options: {
          context: {
            title: 'This is just a test',
            collection: [
              'test1',
              'test2',
              'test3'
            ],
            hash: {
              name: 'Testicus',
              description: 'Lorem ipsum dolor sit amet.'
            }
          }
        }
      }
    },
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'hamlbein', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
