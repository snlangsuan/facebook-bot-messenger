var Message = require('../message');

TextMessage.prototype = new Message();
TextMessage.prototype.constructor = TextMessage;

function TextMessage(text) {
  var that = this;

  this.setText = function(str) {
    text = str;

    return that;
  }

  this.getText = function() {
    return text;
  }

  this.buildMessage = function() {
    return {
      text: text
    };
  }
}

module.exports = TextMessage;
