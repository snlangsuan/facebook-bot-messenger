var BaseEvent = require('./base.event');

MessageEvent.prototype = new BaseEvent();
MessageEvent.prototype.constructor = MessageEvent;

function MessageEvent(pageId, timeOfEvent, event) {
  BaseEvent.apply(this, arguments);
  var that = this;
  this.setType(BaseEvent.TYPE.MESSAGE);

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

module.exports = MessageEvent;
