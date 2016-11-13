var Message = require('../message');

TextMessage.prototype = new Message();
TextMessage.prototype.constructor = TextMessage;

function TextMessage(text) {
  Message.apply(this, arguments);
  var that = this;

  this.setText = function(str) {
    text = str;

    return that;
  }

  this.getText = function() {
    return text;
  }

  this.buildMessage = function() {
    var message = {
      text: text
    };
    if ( (metadata = that.getMetadata()) != null ) message.metadata = metadata;

    return message;
  }
}

module.exports = TextMessage;
