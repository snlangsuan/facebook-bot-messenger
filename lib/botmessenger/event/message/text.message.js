var MessageEvent = require('../message.event');

TextMessage.prototype = new MessageEvent();
TextMessage.prototype.constructor = TextMessage;

function TextMessage() {
  MessageEvent.apply(this, arguments);
  var event = arguments[2];
  var message = this.getMessage();
  var that = this;

  this.getText = function() {
    return message.text;
  }

  this.getQuickReply = function() {
    return message.quick_reply.payload;
  }
}

module.exports = TextMessage;
