describe('htmlfile', function () {
  'use strict';

  function ActiveXObject(type) {
    this.type = type;
    this.data = [];
    this.body = '';
  }

  ActiveXObject.prototype.open = function () { return this.data.push('open'); };
  ActiveXObject.prototype.close = function () { return this.data.push('close'); };
  ActiveXObject.prototype.write = function (data) { this.body += data; };

  //
  // Really minimum viable ActiveXObject polyfill for a HTMLfiles. This allows
  // us to check if everything works as intended.
  //
  global.ActiveXObject = ActiveXObject;

  var calls = 0;
  global.CollectGarbage = function () { calls++; };

  var assume = require('assume')
    , htmlfile = require('./');

  it('is exported as a function', function () {
    assume(htmlfile).is.a('function');
  });

  it('opens and closes the htmlfile', function () {
    var html = htmlfile();

    assume(html.data[0]).equals('open');
    assume(html.data[1]).equals('close');
  });

  it('adds the supplied domain', function () {
    var html = htmlfile('foo.com');

    assume(html.body).to.include('foo.com');
    assume(html.body).to.include('document.domain=');
  });

  it('only adds the domain if it can find one', function () {
    var html = htmlfile();

    assume(html.body).does.not.include('foo.com');
    assume(html.body).does.not.include('document.domain=');
  });

  describe('.supported', function () {
    it('is a boolean', function () {
      assume(htmlfile.supported).is.a('boolean');
    });

    it('is true, as this is node.js & we polyfilled it', function () {
      assume(htmlfile.supported).is.true();
    });
  });

  describe('#destroy', function () {
    it('calls the CollectGarbage method', function () {
      assume(calls).equals(0);
      htmlfile.destroy();
      assume(calls).equals(1);
    });
  });
});
