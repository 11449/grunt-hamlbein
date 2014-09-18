'use strict';

var grunt = require('grunt');

exports.hamlbein = {
  context: function(test) {
    test.expect(1);

    var actual   = grunt.file.read('tmp/context.html'),
        expected = grunt.file.read('test/expected/context.html');

    test.equal(actual, expected, 'should compile haml file with context (data) to html');

    test.done();
  }
};
