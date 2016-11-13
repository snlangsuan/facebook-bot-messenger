var MessageEvent = require('../message.event');

TextMessageEvent.prototype = new MessageEvent();
TextMessageEvent.prototype.constructor = TextMessageEvent;

function TextMessageEvent(pageId, timeOfEvent, event) {
  MessageEvent.apply(this, arguments);
  var that = this;

  this.getText = function() {
    return ('text' in event.message)? event.message.text: null;
  }
}

module.exports = TextMessageEvent;
