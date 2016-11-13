MessageButton.TYPE = {
  URL: 'web_url',
  POSTBACK: 'postback',
  CALL: 'phone_number',
  SHARE: 'element_share',
  BUY: 'payment',
  ACCOUNT_LINK: 'account_link',
  ACCOUNT_UNLINK: 'account_unlink'
};

MessageButton.PAYMENT_TYPE = {
  FIXED: 'FIXED_AMOUNT',
  FLEXIBLE: 'FLEXIBLE_AMOUNT'
};

MessageButton.HEIGHT_RATIO = {
  COMPACT: 'compact',
  TALL: 'tall',
  FULL: 'full'
};

function MessageButton(button) {
  var buttonType = null;
  var that = this;

  this.setType = function(type) {
    buttonType = type;
    return that;
  }

  this.getType = function() {
    return buttonType;
  }
}

module.exports = MessageButton;
