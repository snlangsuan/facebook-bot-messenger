BaseEvent.TYPE = {
  MESSAGE: 'message',
  POSTBACK: 'postback',
  AUTHENTICATION: 'optin',
  DELIVERY: 'delivery',
  READ: 'read',
  ACCOUNT_LINKING: 'account_linking',
  CHECKOUT_UPDATE: 'checkout_update',
  PAYMENT: 'payment',
  ECHO: 'echo'
};

BaseEvent.MESSAGE_TYPE = {
  TEXT: 'text',
  ATTACHMENTS: 'attachments',
  QUICK_REPLY: 'quick_reply'
};

function BaseEvent(pageId, timeOfEvent, event) {
  var that = this;

  this.getEvent = function() {
    return event;
  }

  this.getType = function() {
    return that.type;
  }

  this.isType = function(type) {
    return (that.type == type);
  }

  this.getPageId = function() {
    return pageId;
  }

  this.getTime = function() {
    return timeOfEvent;
  }

  this.getSenderId = function() {
    if ( !('sender' in event) || !('id' in event.sender) ) return null;
    return event.sender.id;
  }

  this.getRecipientId = function() {
    if ( !('recipient' in event) || !('id' in event.recipient) ) return null;
    return event.recipient.id;
  }

  this.getTimestamp = function() {
    return ( !(timestamp = event.timestamp) )? null: timestamp;
  }
}

module.exports = BaseEvent;
