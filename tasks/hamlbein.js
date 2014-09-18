/*
 * grunt-hamlbein
 * https://github.com/11449/grunt-hamlbein
 *
 * Copyright (c) 2014 Andreas Kürbis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var async = grunt.util.async,
      path  = require('path');

  grunt.registerMultiTask('hamlbein', 'compile haml files with ruby haml wrapper', function() {
    var args         = [],
        doneCallback = this.async(),
        options      = this.options({
          context:             false,
          includePath:         false,
          layout:              false,
          rubyHamlBeinCommand: 'bin/hamlbein'
        });

    grunt.verbose.writeflags(options, 'Options');

    async.forEach(this.files, function(file, callback) {
      var src = file.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return filepath;
      });

      if(options.layout) {
        args.push('--layout', options.layout);
      }

      if(options.context) {
        args.push('--context', JSON.stringify(options.context));
      }

      args.push(path.resolve(process.cwd(), src[0]));
      args.push(path.resolve(process.cwd(), file.dest));

      grunt.verbose.debug(args.join(' '));

      grunt.util.spawn({
        cmd:  path.resolve(__dirname, '..', options.rubyHamlBeinCommand),
        args: args,
      }, function done() {
        grunt.verbose.writeflags(arguments, 'arguments');
        grunt.log.writeln('File "' + file.dest + '" created.');

        doneCallback();
      });
    }, doneCallback);
  });

};
