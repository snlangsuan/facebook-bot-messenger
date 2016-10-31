var MessageButtons = require('../button');

ShareButton.prototype = new MessageButtons();
ShareButton.prototype.constructor = ShareButton;

function ShareButton(title, phoneNumber) {
  var that = this;

  this.buildMessageButtons = function() {
    return {
      type: MessageButtons.TYPE.SHARE
    }
  }
}

module.exports = ShareButton;
