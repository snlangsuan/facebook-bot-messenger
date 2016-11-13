var EchoEvent = require('../echo.event');

TextMessage.prototype = new EchoEvent();
TextMessage.prototype.constructor = TextMessage;

function TextMessage(pageId, timeOfEvent, event) {
  EchoEvent.apply(this, arguments);
  var that = this;

  this.getText = function() {
    return ('text' in event.message)? event.message.text: null;
  }
}

module.exports = TextMessage;
