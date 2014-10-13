# htmlfile

[![Build Status](https://travis-ci.org/unshiftio/htmlfile.svg?branch=master)](https://travis-ci.org/unshiftio/htmlfile)
[![NPM version](https://badge.fury.io/js/htmlfile.svg)](http://badge.fury.io/js/htmlfile)
[![Coverage Status](https://img.shields.io/coveralls/unshiftio/htmlfile.svg)](https://coveralls.io/r/unshiftio/htmlfile?branch=master)

Create a new ActiveXObject powered `htmlfile` which includes feature detection
and prevention against blockage by firewalls / virus scanners due to it's
dependency upon the `axo` module.

## Installation

This module was designed to be used with commonjs compatible environment such as
node and browserify, the package it self is released in npm can be installed
using:

```
npm install --save htmlfile
```

## Usage

In all examples we assume that the module loaded as:

```js
var htmlfile = require('htmlfile');
```

The require call returns a function which can be used for the construction of
htmlfiles. This function accepts one optional argument which is used to set the
`document.domain` of the newly created `htmlfile` instance. If no domain is
provided it will default to `document.domain`:

```js
var file = htmlfile();

//
// Or with a custom domain:
//
file = htmlfile('//github.com');
```

### htmlfile.supported

As ActiveXObject is an Internet Explorer only technology you need to check if
your current browser environment is supported. This can be done by calling the
`.supported` method on the htmlfile function. A boolean will be returned
indicating if the environment can construct htmlfiles:

```js
if (!htmlfile.supported()) throw new Error('Not supported, upgrade to IE5 ;-)');
```

### htmlfile.destroy

Once you are done with using the htmlfile it needs to be cleaned up to prevent
memory leaks and IE odd ness. Make sure you dereference the returned htmlfile
from all your variables and properties and call the `destroy` method to trigger
the IE specific garbage collection:

```js
var file = htmlfile();

// .. do stuff

// Unreference the file and destroy all the things.
file = null;
htmlfile.destroy();
```

## License

MIT
