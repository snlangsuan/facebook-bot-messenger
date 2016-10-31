MessageButtons.TYPE = {
  URL: 'web_url',
  POSTBACK: 'postback',
  CALL: 'phone_number',
  SHARE: 'element_share',
  BUY: 'payment'
};

MessageButtons.PAYMENT_TYPE = {
  FIXED_AMOUNT: 'FIXED_AMOUNT',
  FLEXIBLE_AMOUNT: 'FLEXIBLE_AMOUNT'
};

MessageButtons.HEIGHT_RATIO = {
  COMPACT: 'compact',
  TALL: 'tall',
  FULL: 'full'
};

function MessageButtons() {}

MessageButtons.prototype.buildMessageButtons = function() {}

module.exports = MessageButtons;
