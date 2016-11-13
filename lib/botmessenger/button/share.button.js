var MessageButton = require('../button');

ShareButton.prototype = new MessageButton();
ShareButton.prototype.constructor = ShareButton;

function ShareButton() {
  MessageButton.apply(this, arguments);
  var that = this;
  this.setType(MessageButton.TYPE.SHARE);

  this.buildMessageButton = function() {
    return {
      type: that.getType()
    };
  }
}

module.exports = ShareButton;
