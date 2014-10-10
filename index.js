'use strict';

var AXO = require('axo');

/**
 * Create a pre-configured htmlfile.
 *
 * @param {String} domain The document.domain of the document.
 * @returns {htmlfile}
 * @api public
 */
var htmlfile = module.exports = function create(domain) {
  domain = domain || document.domain;

  var htmlfile = new AXO('htmlfile')
    , body = '<html><body>';

  //
  // Update the document.domain to the current domain if one is supplied or
  // set. For localhost this is usually undefined.
  //
  if (domain) {
    body += '<script>document.domain="'+ domain +'"\x3c/script>';
  }

  htmlfile.open();
  htmlfile.write(body +'</body></html>');
  htmlfile.close();

  return htmlfile;
};

/**
 * Destroy a given htmlfile.
 *
 * @api public
 */
htmlfile.destroy = function destroy() {
  CollectGarbage();
};

/**
 * Check if ActiveXObject is supported in browser. ActiveXObject is an IE only
 * technology but it can still be disabled in the Internet Options of the
 * browser so the only reliable way of detecting the support for it is to
 * simply attempt to construct something with the ActiveXObject.
 *
 * @returns {Boolean}
 * @api public
 */
htmlfile.supported = (function supported() {
  try { return !!new AXO('htmlfile') && 'function' === typeof CollectGarbage; }
  catch (e) { return false; }
}());
