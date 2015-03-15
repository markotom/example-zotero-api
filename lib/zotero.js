var https = require('https');
var qs = require('qs');

var Zotero = function (options) {
  options = options || {};

  this.key = options.key;
  this.user = options.user;
  this.collection = options.collection;
};

Zotero.prototype.create = function (thing, params, callback) {
  if ('item' === thing) {
    this._request('POST', '/users/' + this.user + '/items', params, callback);
  }
};

Zotero.prototype.getItems = function (params, callback) {
  var path = 'items';

  if (this.collection) {
    path = 'collections/' + this.collection + '/' + path;
  }

  if (typeof params === 'function') {
    this._request('GET', path, {}, params);
  } else {
    this._request('GET', path, params, callback);
  }
};

Zotero.prototype._request = function (method, path, params, callback) {
  params = params || {};

  params.key = this.key;

  var options = {
    host: 'api.zotero.org',
    port: 443,
    path:  '/users/' + this.user + '/' + path + '?' + qs.stringify(params),
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var req = https.request(options, function (res) {
    var data = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) { data += chunk; });
    res.on('end', function () {
      data = JSON.parse(data);
      return callback(null, data);
    });
  });

  req.on('error', function (e) {
    return callback(e, null);
  });

  req.write(JSON.stringify(params));
};

module.exports = Zotero;
