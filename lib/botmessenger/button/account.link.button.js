var MessageButton = require('../button');

AccountLinkButton.prototype = new MessageButton();
AccountLinkButton.prototype.constructor = AccountLinkButton;

function AccountLinkButton(link) {
  MessageButton.apply(this, arguments);
  var that = this;
  this.setType(MessageButton.TYPE.ACCOUNT_LINK);

  this.setLink = function(url) {
    link = url;
    return that;
  }

  this.getLink = function() {
    return link;
  }

  this.buildMessageButton = function() {
    return {
      type: that.getType(),
      url: link
    };
  }
}

module.exports = AccountLinkButton;
