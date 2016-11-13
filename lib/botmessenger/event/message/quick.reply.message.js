var MessageEvent = require('../message.event');

QuickReplyMessageEvent.prototype = new MessageEvent();
QuickReplyMessageEvent.prototype.constructor = QuickReplyMessageEvent;

function QuickReplyMessageEvent(pageId, timeOfEvent, event) {
  MessageEvent.apply(this, arguments);
  var that = this;

  this.getText = function() {
    return ('text' in event.message)? event.message.text: null;
  }

  this.getData = function() {
    return ('payload' in event.message.quick_reply)? event.message.quick_reply.payload: null;
  }
}

module.exports = QuickReplyMessageEvent;
