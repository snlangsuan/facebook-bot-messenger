var SignatureValidator = require('./signature.validator');

Event.SUPPORTED_CHANNELS = {
    MESSAGING: 'messaging',
    STANDBY: 'standby'
}

function Event() {
    const eventTypeClass = {
        message: require('./event/message.event'),
        delivery: require('./event/delivery.event'),
        read: require('./event/read.event'),
        echo: require('./event/echo.event'),
        postback: require('./event/postback.event'),
        optin: require('./event/optin.event'),
        referral: require('./event/referral.event'),
        payment: require('./event/payment.event'),
        checkout_update: require('./event/checkout.update.event'),
        account_linking: require('./event/account.linking.event'),
        request_thread_control: require('./event/request.thread.control.event'),
        take_thread_control: require('./event/take.thread.control.event'),
        pass_thread_control: require('./event/pass.thread.control.event'),
        app_roles: require('./event/app.roles.event')
    };

    const messageTypeClass = {
        text: require('./event/message/text.message'),
        quick_reply: require('./event/message/quick.reply.message'),
        attachments: require('./event/message/attachments.message')
    };

    const echoMessageTypeClass = {
        text: require('./event/echo/text.message'),
        quick_reply: require('./event/echo/quick.reply.message'),
        attachments: require('./event/echo/attachments.message')
    };

    var that = this;

    this.parseEventRequest = function(body, appSecret, signature) {
        if (!signature) throw new Error('Request does not contain signature');
        if (typeof body === 'string') throw new Error('Request body must not be String');

        var rawBody = (body instanceof Buffer) ? body : body = new Buffer(JSON.stringify(body));
        if (!SignatureValidator.validateSignature(rawBody, appSecret, signature)) throw new Error('Invalid signature has given');
        body = JSON.parse(body.toString());

        return that.parseEvent(body);
    }

    this.parseEvent = function(body) {
        var events = [];
        if (body.object != 'page' || !body['entry']) throw new Error('Invalid event request');

        for (var i in body.entry) {
            var pageEntry = body.entry[i];
            var pageID = pageEntry.id;
            var timeOfEvent = pageEntry.time;
            var channel = that.getChannelType(pageEntry);

            for (var j in pageEntry[channel]) {
                var messagingData = pageEntry[channel][j];
                var eventType = that.getEventType(messagingData);
                var eventClass = eventTypeClass[eventType];
                if (!eventClass) throw new Error('Unknown event type has come: ' + eventType);

                if (eventType === 'message') {
                    events.push(that.parseMessageEvent(pageID, timeOfEvent, messagingData, channel));
                    continue;
                }

                if (eventType === 'echo') {
                    events.push(that.parseEchoMessageEvent(pageID, timeOfEvent, messagingData, channel));
                    continue;
                }

                events.push(new eventClass(pageID, timeOfEvent, messagingData, channel));
            }
        }

        return events;
    }

    this.getChannelType = function (pageEntry) {
        console.log(Object.keys(pageEntry));
        console.log(Object.values(Event.SUPPORTED_CHANNELS));
        var channelType = Object.keys(pageEntry).filter(value => Object.values(Event.SUPPORTED_CHANNELS).includes(value)).toString();
        if (!channelType) {
            throw new Error("Channel is currently not supported. Only 'messaging' and 'standby' channels are supported")
        }
        return channelType;
    }

    this.getEventType = function(messagingData) {
        if ('message' in messagingData && messagingData.message.is_echo) return 'echo';
        var events = Object.keys(eventTypeClass);
        for (var i in events) {
            if (events[i] in messagingData) return events[i];
        }
        return false;
    }

    this.getMessageType = function(message) {
        if ('quick_reply' in message) return 'quick_reply';
        if ('text' in message) return 'text';
        if ('attachments' in message) return 'attachments';
        return false;
    }

    this.parseMessageEvent = function(pageID, timeOfEvent, messagingData, channel) {
        var message = messagingData.message;
        var messageType = that.getMessageType(message);
        var messageClass = messageTypeClass[messageType];
        if (!messageClass) throw new Error('Unknown message type has come: ' + messageType);
        return new messageClass(pageID, timeOfEvent, messagingData, channel);
    }

    this.parseEchoMessageEvent = function(pageID, timeOfEvent, messagingData, channel) {
        var message = messagingData.message;
        var messageType = that.getMessageType(message);
        var messageClass = echoMessageTypeClass[messageType];
        if (!messageClass) throw new Error('Unknown message type has come: ' + messageType);
        return new messageClass(pageID, timeOfEvent, messagingData, channel);
    }
}

module.exports = new Event();