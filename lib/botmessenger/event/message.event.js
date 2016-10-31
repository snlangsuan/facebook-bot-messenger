var BaseEvent = require('./base.event');

MessageEvent.prototype = new BaseEvent();
MessageEvent.prototype.constructor = MessageEvent;

function MessageEvent() {
  BaseEvent.apply(this, arguments);
  if ( arguments.length < 1 ) return;
  var event = arguments[2];
  var message = event.message;
  BaseEvent.prototype.type = BaseEvent.TYPE.MESSAGE;
  var that = this;

  if ( 'is_echo' in message && message.is_echo ) {
    BaseEvent.prototype.type = BaseEvent.TYPE.ECHO;

    this.getAppId = function() {
      return message.app_id;
    }

    this.getMetadata = function() {
      return message.metadata;
    }
  }

  this.getMessage = function() {
    return message;
  }

  this.getMessageType = function() {
    if ( 'quick_reply' in message ) return BaseEvent.MESSAGE_TYPE.QUICK_REPLY;
    if ( 'text' in message ) return BaseEvent.MESSAGE_TYPE.TEXT;
    return BaseEvent.MESSAGE_TYPE.ATTACHMENTS;
  }

  this.isMessageType = function(type) {
    return (that.getMessageType() == type);
  }

  this.isTextMessage = function() {
    return that.isMessageType(BaseEvent.MESSAGE_TYPE.TEXT);
  }

  this.isQuickReplay = function() {
    return that.isMessageType(BaseEvent.MESSAGE_TYPE.QUICK_REPLY);
  }

  this.hasAttachments = function() {
    return that.isMessageType(BaseEvent.MESSAGE_TYPE.ATTACHMENTS);
  }

  this.getMessageSeq = function() {
    return message.seq;
  }

  this.getMessageId = function() {
    return message.mid;
  }
}

module.exports = MessageEvent;
