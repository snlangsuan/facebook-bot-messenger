var MessageButton = require('../button');

AccountUnlinkButton.prototype = new MessageButton();
AccountUnlinkButton.prototype.constructor = AccountUnlinkButton;

function AccountUnlinkButton(link) {
  MessageButton.apply(this, arguments);
  var that = this;
  this.setType(MessageButton.TYPE.ACCOUNT_UNLINK);

  this.buildMessageButton = function() {
    return {
      type: that.getType()
    };
  }
}

module.exports = AccountUnlinkButton;
