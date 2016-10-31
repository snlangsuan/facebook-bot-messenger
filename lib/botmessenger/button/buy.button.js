var MessageButtons = require('../button');

BuyButton.prototype = new MessageButtons();
BuyButton.prototype.constructor = BuyButton;

function BuyButton(title, data) {
  var that = this;
  var summary = {};

  this.setTitle = function(str) {
    title = str;
    return that;
  }

  this.getTitle = function() {
    return title;
  }

  this.setData = function(str) {
    data = str;
    return that;
  }

  this.getData = function() {
    return data;
  }

  this.setPaymentSummary = function(currency, payment_type, merchant_name, requested_user_info) {
    summary.currency = currency;
    summary.payment_type = payment_type;
    summary.merchant_name = merchant_name;
    return that;
  }

  this.getPaymentSummary = function() {
    return summary;
  }

  this.requestedUserInfo = function() {
    if ( arguments.length < 1 )
      summary.requested_user_info = [
        "shipping_address",
        "contact_name",
        "contact_phone",
        "contact_email"
      ];
    else
      summary.requested_user_info = arguments;

    return that;
  }

  this.addPriceList = function(label, amount) {
    if ( !summary['price_list'] ) summary.price_list = [];
    summary.price_list.push({
      label: label,
      amount: amount
    });

    return that;
  }

  this.buildMessageButtons = function() {
    return {
      type: MessageButtons.TYPE.PAYMENT,
      title: title,
      payload: data,
      payment_summary: summary
    }
  }
}

module.exports = BuyButton;
