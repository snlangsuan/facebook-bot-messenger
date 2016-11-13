BaseEvent.TYPE = {
  MESSAGE: 'message',
  MESSAGE_DELIVERED: 'delivery',
  MESSAGE_READ: 'read',
  MESSAGE_ECHO: 'echo',
  POSTBACK: 'postback',
  OPTIN: 'optin',
  REFERRAL: 'referral',
  PAYMENTS: 'payment',
  CHECKOUT_UPDATE: 'checkout_update',
  ACCOUNT_LINKING: 'account_linking'
};

function BaseEvent(pageId, timeOfEvent, event) {
  var that = this;
  var eventType;

  this.getType = function() {
    return eventType;
  }

  this.setType = function(type) {
    eventType = type;
  }

  this.getPageId = function() {
    return pageId;
  }

  this.getTime = function() {
    return timeOfEvent;
  }

  this.getUserId = function() {
    return (that.getType() === BaseEvent.TYPE.MESSAGE)? that.getSenderId(): that.getRecipientId();
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

  this.toJSON = function() {
    return event;
  }

  this.toString = function() {
    return JSON.stringify(event);
  }
}

module.exports = BaseEvent;
