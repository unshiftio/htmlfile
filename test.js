describe('htmlfile', function () {
  'use strict';

  var assume = require('assume')
    , htmlfile = require('./');

  it('is exported as a function', function () {
    assume(htmlfile).is.a('function');
  });

  describe('.supported', function () {
    it('is a boolean', function () {
      assume(htmlfile.supported).is.a('boolean');
    });

    it('is false, as this is node.js', function () {
      assume(htmlfile.supported).is.false();
    });
  });
});
