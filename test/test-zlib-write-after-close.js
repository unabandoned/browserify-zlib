'use strict';
const common = require('./common');
var assert = require('assert');
var zlib = require('../');

zlib.gzip('hello', common.mustCall(function(err, out) {
  var unzip = zlib.createGunzip();
  unzip.close(common.mustCall(function() {}));
  // On modern streams, writing after close does not throw synchronously; it
  // surfaces as an asynchronous 'error' event ("zlib binding closed") instead.
  unzip.once('error', common.mustCall(function() {}));
  unzip.write(out);
}));
