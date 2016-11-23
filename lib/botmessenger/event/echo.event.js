var BaseEvent = require('./base.event');

EchoEvent.prototype = new BaseEvent();
EchoEvent.prototype.constructor = EchoEvent;

function EchoEvent(pageId, timeOfEvent, event) {
  BaseEvent.apply(this, arguments);
  var that = this;
  this.setType(BaseEvent.TYPE.MESSAGE_ECHO);

  this.getAppId = function() {
    return ('app_id' in event.message)? event.message.app_id: null;
  }

  this.getMetadata = function() {
    return ('metadata' in event.message)? event.message.metadata: null;
  }

  this.isTextMessage = function() {
    return ('text' in event.message && !that.isQuickReply());
  }

  this.isQuickReply = function() {
    return ('quick_reply' in event.message);
  }

  this.hasAttachments = function() {
    return ('attachments' in event.message);
  }

  this.getMessageSeq = function() {
    return ('seq' in event.message)? event.message.seq: null;
  }

  this.getMessageId = function() {
    return ('mid' in event.message)? event.message.mid: null;
  }
}

module.exports = EchoEvent;
