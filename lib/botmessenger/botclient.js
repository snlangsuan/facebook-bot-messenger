var request = require('request');
var URL = require('url');
var queryString = require('querystring');

BotClient.prototype.resolveQueryString = function(url, defaultQuery) {
  var requestUrl = URL.parse(url, true);
  var query = requestUrl.query;

  for ( var i in defaultQuery ) {
    if ( !query[i] ) query[i] = encodeURIComponent(defaultQuery[i]);
  }

  delete requestUrl.href;
  delete requestUrl.path;
  delete requestUrl.query;
  requestUrl.search = '?' + queryString.stringify(query);

  return URL.format(requestUrl);
}

function BotClient(accessToken) {
  var defaultQuery = {
    access_token: accessToken
  };
  var headers = {};

  var that = this;

  this.get = function(url) {
    return that.sendRequest('GET', url);
  }

  this.post = function(url, data) {
    return that.sendRequest('POST', url, { 'Content-Type': 'application/json; charset=utf-8' }, data);
  }

  this.sendRequest = function(method, url, additionalHeader, reqBody) {
    if ( additionalHeader && Object.keys(additionalHeader).length > 0 ) {
      for ( var i in additionalHeader ) {
        headers[i] = additionalHeader[i];
      }
    }

    url = that.resolveQueryString(url, defaultQuery);

    var options = {
      method: method,
      url: url,
      headers: headers,
      json: true
    };

    if ( reqBody ) options.body = reqBody;

    return new Promise(function(resolve, reject) {
      request(options, function(error, response, body) {
        if ( !error && response.statusCode == 200 ) resolve(body);
        else if ( !error ) reject(body);
        else reject(error );
      });
    });
  }
}

module.exports = BotClient;
