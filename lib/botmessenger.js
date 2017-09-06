var Http = require('http');
var url = require('url');
var BotClient = require('./botmessenger/botclient');

var Event = require('./botmessenger/event');

var TextMessage = require('./botmessenger/message/text.message');
var AttachmentMessage = require('./botmessenger/message/attachment.message');

var Message = require('./botmessenger/message');

var util = require('util');
var EventEmitter = require('events').EventEmitter;

function BotMessenger(client, appSecret, options) {
    if (!client instanceof BotClient) throw new Error('BotClient is not defined');

    if (typeof appSecret === 'object') {
        options = appSecret;
    } else {
        if (!appSecret) throw new Error('app secret is not defined');
        if (!options['validationToken']) throw new Error('validation token is not defined');
    }

    var that = this;
    const DEFAULT_ENDPOINT_BASE = 'https://graph.facebook.com';
    const DEFAULT_ENDPOINT_VERSION = 'v2.8';
    if (!options) options = {};
    var endpointBase = (!options['endpointBase']) ? DEFAULT_ENDPOINT_BASE : options['endpointBase'];
    var endpointVersion = (!options['endpointVersion']) ? DEFAULT_ENDPOINT_VERSION : options['endpointVersion'];

    for (var i in options) {
        this[i] = options[i];
    }

    this.set = function(key, value) {
        that[key] = value;
    }

    this.get = function(key) {
        return that[key];
    }

    var httpRequest = function(req, res) {
        switch (req.method) {
            case 'GET':
                that.handleGETRequest(req, res);
                break;
            case 'POST':
                that.handlePOSTRequest(req, res);
                break;
        }
    }

    this.attach = function(http) {
        that.httpServer = http;
        that.httpServer.on('request', httpRequest);
        return that;
    }

    this.address = function() {
        return that.httpServer.address();
    }

    this.webhook = function(route) {
        that.route = route;

        return function(req, res, next) {
            var requestUrl = that.parseRequestUrl(req.url);
            if (requestUrl.path == that.route) return;
            next();
        };
    }

    this.listen = function() {
        if (!that.route) that.route = '/';
        var params = arguments;
        var callback = (typeof params[params.length - 1] === 'function') ? params[params.length - 1] : null;
        if (params[0] < 1) throw new Error('Port number is not defined');
        var port = parseInt(params[0]);
        var hostname = (typeof params[1] === 'string') ? params[1] : null;
        that.httpServer = Http.createServer(httpRequest).listen(port, hostname, callback);
    }

    this.close = function(callback) {
        that.httpServer.close(callback);
    }

    this.getProfile = function(userId) {
        return client.get(endpointBase + '/' + endpointVersion + '/' + encodeURIComponent(userId));
    }

    this.getMessageContent = function(messageId) {
        return client.get(endpointBase + '/' + endpointVersion + '/' + encodeURIComponent(messageId));
    }

    this.sendMessage = function(to, messageBuilder) {
        return client.post(endpointBase + '/' + endpointVersion + '/me/messages', {
            recipient: { id: to },
            message: messageBuilder.buildMessage()
        });
    }

    this.sendJsonMessage = function(json) {
        return client.post(endpointBase + '/' + endpointVersion + '/me/messages', json);
    }

    this.sendTextMessage = function(to, text) {
        var messageBuilder = new TextMessage(text);
        return that.sendMessage(to, messageBuilder);
    }

    this.sendImageMessage = function(to, contentUrl, reusable) {
        var messageBuilder = new AttachmentMessage();
        messageBuilder.addImageAttachment(contentUrl, reusable);
        return that.sendMessage(to, messageBuilder);
    }

    this.sendAudioMessage = function(to, contentUrl, reusable) {
        var messageBuilder = new AttachmentMessage();
        messageBuilder.addAudioAttachment(contentUrl, reusable);
        return that.sendMessage(to, messageBuilder);
    }

    this.sendVideoMessage = function(to, contentUrl, reusable) {
        var messageBuilder = new AttachmentMessage();
        messageBuilder.addVideoAttachment(contentUrl, reusable);
        return that.sendMessage(to, messageBuilder);
    }

    this.sendFileMessage = function(to, contentUrl, reusable) {
        var messageBuilder = new AttachmentMessage();
        messageBuilder.addFileAttachment(contentUrl, reusable);
        return that.sendMessage(to, messageBuilder);
    }

    this.sendAction = function(to, action) {
        return client.post(endpointBase + '/' + endpointVersion + '/me/messages', {
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
        var requestUrl = that.parseRequestUrl(req.url);
        var query = requestUrl.query;

        if (requestUrl.path == that.route) {
            if (query['hub.mode'] === 'subscribe' && query['hub.verify_token'] === that.validationToken) {
                res.writeHead(200);
                res.end(query['hub.challenge']);
                return;
            }
            res.writeHead(403);
            res.end();
        }
    }

    this.handlePOSTRequest = function(req, res) {
        var requestUrl = that.parseRequestUrl(req.url);
        if (requestUrl.path == that.route) {
            var body = [];
            req.on('data', function(chunk) {
                body.push(chunk);
            }).on('end', function() {
                body = Buffer.concat(body); //.toString();
                if (!body) return;
                // var json = JSON.parse(body);

                var headers = req.headers;
                var signature = headers['x-hub-signature'];

                that.handleEventRequest(body, signature);
            });

            res.end();
        }
    }

    this.parseRequestUrl = function(requestUrl) {
        requestUrl = url.parse(requestUrl, true);
        var query = requestUrl.query;
        var path = requestUrl.pathname;

        return {
            path: path,
            query: query
        };
    }

    this.emitEvents = function(events) {
        for (var i in events) {
            var message = events[i];
            that.emit(message.getType(), message.getSenderId(), message);
        }
    }

    this.handleEventRequest = function(body, signature) {
        try {
            var eventReq = that.parseEventRequest(body, signature);
            that.emitEvents(eventReq);
        } catch (e) {
            console.error(e);
        }
    }

    this.parseEventRequest = function(body, signature) {
        return Event.parseEventRequest(body, appSecret, signature);
    }

    this.validateSignature = function(body, signature) {
        return SignatureValidator.validateSignature(body, appSecret, signature);
    }

    this.parse = function(body) {
        try {
            var events = Event.parseEvent(body);
            that.emitEvents(events);
        } catch (e) {
            console.error(e);
        }
    }
}

util.inherits(BotMessenger, EventEmitter);

module.exports = BotMessenger;