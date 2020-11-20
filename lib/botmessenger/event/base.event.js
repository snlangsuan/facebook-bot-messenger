BaseEvent.TYPE = {
  STANDBY: 'standby',
  MESSAGE: 'message',
  MESSAGE_DELIVERED: 'delivery',
  MESSAGE_READ: 'read',
  MESSAGE_ECHO: 'echo',
  POSTBACK: 'postback',
  OPTIN: 'optin',
  REFERRAL: 'referral',
  PAYMENTS: 'payment',
  CHECKOUT_UPDATE: 'checkout_update',
  ACCOUNT_LINKING: 'account_linking',
  PASS_THREAD_CONTROL: 'pass_thread_control',
  TAKE_THREAD_CONTROL: 'take_thread_control',
  REQUEST_THREAD_CONTROL: 'request_thread_control',
  APP_ROLES: 'app_roles'
};

function BaseEvent(pageId, timeOfEvent, event, channel) {
  var that = this;
  var eventType;

  this.getType = function() {
    return eventType;
  }

  this.setType = function(type) {
    eventType = type;
  }

  this.getChannel = function () {
    return channel;
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
