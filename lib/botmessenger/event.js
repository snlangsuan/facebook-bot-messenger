var SignatureValidator = require('./signature.validator');

Event.prototype.eventTypeClass = {
  message: require('./event/message.event'),
  postback: require('./event/postback.event'),
  optin: require('./event/authentication.event'),
  delivery: require('./event/delivery.event'),
  read: require('./event/read.event'),
  account_linking: require('./event/account.linking.event'),
  checkout_update: require('./event/checkout.update.event'),
  payment: require('./event/payment.event')
};

Event.prototype.messageTypeClass = {
  text: require('./event/message/text.message'),
  attachments: require('./event/message/attachments.message')
};

function Event() {}

Event.prototype.parseEventRequest = function(body, appSecret, signature) {
  if ( !signature ) throw new Error('Request does not contain signature');

  var rawBody = ( typeof body === 'string' )? body: JSON.stringify(body);
  if ( !SignatureValidator.validateSignature(rawBody, appSecret, signature) ) throw new Error('Invalid signature has given');

  var events = [];

  if ( body.object != 'page' || !body['entry'] ) throw new Error('Invalid event request');

  for ( var i in body.entry ) {
    var pageEntry = body.entry[i];
    var pageID = pageEntry.id;
    var timeOfEvent = pageEntry.time;

    for ( var j in pageEntry.messaging ) {
      var messagingEvent = pageEntry.messaging[j];
      var eventType = this.getEventType(messagingEvent);
      var eventClass = this.eventTypeClass[eventType];

      if ( !eventClass ) throw new Error('Unknown event type has come: ' + eventType);

      if ( eventType === 'message' ) {
        events.push(this.parseMessageEvent(pageID, timeOfEvent, messagingEvent));
        continue;
      }

      events.push(new eventClass(pageID, timeOfEvent, messagingEvent));
    }
  }

  return events;
}

Event.prototype.parseMessageEvent = function(pageID, timeOfEvent, messagingEvent) {
  var message = messagingEvent.message;
  var messageType = this.getMessageType(message);
  var messageClass = this.messageTypeClass[messageType];
  if ( !messageClass ) throw new Error('Unknown message type has come: ' + messageType);

  return new messageClass(pageID, timeOfEvent, messagingEvent);
}

Event.prototype.getEventType = function(messagingEvent) {
  var events = Object.keys(this.eventTypeClass);

  for ( var i in events ) {
    if ( events[i] in messagingEvent ) return events[i];
  }

  return false;
}

Event.prototype.getMessageType = function(message) {
  if ( 'text' in message ) return 'text';
  if ( 'attachments' in message ) return 'attachments';
  return false;
}

module.exports = new Event();
