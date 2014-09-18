'use strict';

var grunt = require('grunt');

exports.hamlbein = {
  test: function(test) {
    test.expect(1);

    var actual   = grunt.file.read('tmp/simple.html'),
        expected = grunt.file.read('test/expected/simple.html');

    test.equal(actual, expected, 'should compile simple haml file to html');

    test.done();
  }
};
