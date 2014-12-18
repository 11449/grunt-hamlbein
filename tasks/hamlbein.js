/*
 * grunt-hamlbein
 * https://github.com/11449/grunt-hamlbein
 *
 * Copyright (c) 2014 Andreas Kürbis
 * Licensed under the MIT license.
 */

'use strict';

var async = require('async'),
    path  = require('path'),
    spawn = require('win-spawn');

module.exports = function(grunt) {
  grunt.registerMultiTask('hamlbein', 'compile haml files with ruby haml wrapper', function() {
    var args     = [],
        bin      = 'hamlbein',
        cb       = this.async(),
        options  = this.options({
          context:             false,
          includePath:         false,
          layout:              false,
          rubyHamlBeinCommand: 'bin/hamlbein'
        }),
        cp,
        src;

    grunt.verbose.writeflags(options, 'Options');

    bin = path.resolve(__dirname, '..', options.rubyHamlBeinCommand);

    async.each(this.files, function(file, next){
      src = file.src[0];

      if (typeof src !== 'string') {
        src = file.orig.src[0];
      }

      // check if file exists
      if (!grunt.file.exists(src)) {
        grunt.log.warn('Source file "' + src + '" not found.');
        return next();
      }

      // prepare haml args
      if(options.layout) {
        args.push('--layout', options.layout);
      }

      if(options.context) {
        args.push('--context', JSON.stringify(options.context));
      }

      args.push(path.resolve(process.cwd(), src));
      args.push(path.resolve(process.cwd(), file.dest));

      grunt.verbose.debug(args.join(' '));

      // Make sure grunt creates the destination folders if they don't exist
      if (!grunt.file.exists(file.dest)) {
        grunt.file.write(file.dest, '');
      }

      grunt.verbose.writeln('Command: ' + bin + ' ' + args.join(' '));

      cp = spawn(bin, args, {stdio: 'inherit'});
      cp.on('error', grunt.warn);
      cp.on('close', function (code) {
        if (code > 0) {
          return grunt.warn('Exited with error code ' + code);
        }

        grunt.verbose.writeln('File ' + file.dest + ' created.');
        next();
      });
    }, cb);
  });
};
