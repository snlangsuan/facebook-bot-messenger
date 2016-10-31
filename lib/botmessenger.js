var Http = require('http');
var url = require('url');
var BotClient = require('./botmessenger/botclient');

var TextMessage = require('./botmessenger/message/text.message');
var ImageMessage = require('./botmessenger/message/image.message');
var AudioMessage = require('./botmessenger/message/audio.message');
var VideoMessage = require('./botmessenger/message/video.message');
var FileMessage = require('./botmessenger/message/file.message');

var util = require('util');
var EventEmitter = require('events').EventEmitter;

function BotMessenger(client, appSecret, options) {
  if ( !client instanceof BotClient ) throw new Error('BotClient is not defined');
  if ( !appSecret ) throw new Error('app secret is not defined');
  if ( !options['validationToken'] ) throw new Error('validation token is not defined');
  this.authorize = '/authorize';
  this.authCode = '1234567890';

  var that = this;
  const DEFAULT_ENDPOINT_BASE = 'https://graph.facebook.com';
  if ( !options ) options = {};
  var endpointBase = ( !options['endpointBase'] )? DEFAULT_ENDPOINT_BASE: options['endpointBase'];

  for ( var i in options ) {
    this[i] = options[i];
  }

  this.set = function(key, value) {
    this[key] = value;
  }

  this.get = function(key) {
    return this[key];
  }

  var httpRequest = function(req, res) {
    switch ( req.method ) {
      case 'GET':
        that.handleGETRequest(req, res);
        break;
      case 'POST':
        that.handlePOSTRequest(req, res);
        break;
      default:
        res.end();
    }
  }

  this.attach = function(http) {
    this.httpServer = http;
    this.httpServer.on('request', httpRequest);
    return this;
  }

  this.address = function() {
    return this.httpServer.address();
  }

  this.webhook = function(route) {
    this.route = route;

    return this;
  }

  this.authorize = function(route) {
    if ( route ) this.authorize = route;

    return this;
  }

  this.listen = function() {
    if ( ! this.route ) this.route = '/';
    var params = arguments;
    var callback = (typeof params[params.length-1] === 'function' )? params[params.length-1]: null;
    if ( params[0] < 1 ) throw new Error('Port number is not defined');
    var port = parseInt(params[0]);
    var hostname = (typeof params[1] === 'string')? params[1]: null;
    this.httpServer = Http.createServer(httpRequest).listen(port, hostname, callback);
  }

  this.close = function(callback) {
    this.httpServer.close(callback);
  }

  this.getProfile = function(userId) {
    return client.get(endpointBase + '/v2.8/' + encodeURIComponent(userId));
  }

  this.getMessageContent = function(messageId) {
    return client.get(endpointBase + '/v2.8/' + encodeURIComponent(messageId));
  }

  this.sendMessage = function(to, messageBuilder) {
    return client.post(endpointBase + '/v2.8/me/messages', {
      recipient: { id: to },
      message: messageBuilder.buildMessage()
    });
  }

  this.sendTextMessage = function(to, text) {
    var messageBuilder = new TextMessage(text);
    return that.sendMessage(to, messageBuilder);
  }

  this.sendImageMessage = function(to, contentUrl) {
    var messageBuilder = new ImageMessage(contentUrl);
    return that.sendMessage(to, messageBuilder);
  }

  this.sendAudioMessage = function(to, contentUrl) {
    var messageBuilder = new AudioMessage(contentUrl);
    return that.sendMessage(to, messageBuilder);
  }

  this.sendVideoMessage = function(to, contentUrl) {
    var messageBuilder = new VideoMessage(contentUrl);
    return that.sendMessage(to, messageBuilder);
  }

  this.sendFileMessage = function(to, contentUrl) {
    var messageBuilder = new FileMessage(contentUrl);
    return that.sendMessage(to, messageBuilder);
  }

  this.sendAction = function(to, action) {
    return client.post(endpointBase + '/v2.8/me/messages', {
      recipient: { id: to },
      sender_action: action
    })
  }

  this.sendReadedAction = function(to) {
    return that.sendAction(to, Message.ACTION.READED);
  }

  this.sendTypingAction = function(to) {
    return that.sendAction(to, Message.ACTION.TYPING_ON);
  }

  this.sendClearTypingAction = function(to) {
    return that.sendAction(to, Message.ACTION.TYPING_OFF);
  }

  this.handleGETRequest = function(req, res) {
    var requestUrl = url.parse(req.url, true);
    var query = requestUrl.query;
    var route = requestUrl.pathname;

    switch( route ) {
      case that.route:
        if ( query['hub.mode'] === 'subscribe' && query['hub.verify_token'] === that.validationToken ) {
          res.writeHead(200);
          res.end(query['hub.challenge']);
        } else {
          res.writeHead(403);
          res.end();
        }
        break;
      case that.authorize:
        var accountLinkingToken = query['account_linking_token'];
        var redirectURI = query['redirect_uri'];
        var redirectURISuccess = redirectURI + "&authorization_code=" + that.authCode;
        res.writeHead(200);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
          account_linking_token: accountLinkingToken,
          redirect_uri: redirectURI,
          redirect_uri_success: redirectURISuccess
        }));
        break;
      default:
        res.writeHead(404);
        res.end();
    }
  }

  this.handlePOSTRequest = function(req, res) {
    if ( req.url == that.route ) {
      var body = [];
      req.on('data', function(chunk) {
        body.push(chunk);
      }).on('end', function() {
        body = Buffer.concat(body).toString();
        var json = JSON.parse(body);

        var headers = req.headers;
        var signature = headers['x-hub-signature'];

        that.handleEventRequest(json, signature);
      });

      res.end();
    }

    res.writeHead(404);
    res.end();
  }

  this.handleEventRequest = function(body, signature) {
    try {
      var eventReq = that.parseEventRequest(json, signature);

      for ( var i in eventReq ) {
        var message = eventReq[i];
        that.emit(message.getType(), message.getSenderId(), message);
      }
    } catch(e) {
      console.error(e);
    }
  }

  this.parseEventRequest = function(body, signature) {
    return Event.parseEventRequest(body, appSecret, signature);
  }

  this.validateSignature = function(body, signature) {
    return SignatureValidator.validateSignature(body, appSecret, signature);
  }
}

util.inherits(BotMessenger, EventEmitter);

module.exports = BotMessenger;
