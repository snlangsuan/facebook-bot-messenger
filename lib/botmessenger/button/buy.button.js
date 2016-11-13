var MessageButton = require('../button');

BuyButton.prototype = new MessageButton();
BuyButton.prototype.constructor = BuyButton;
BuyButton.PAYMENT_TYPE = MessageButton.PAYMENT_TYPE;

function BuyButton(title, data) {
  MessageButton.apply(this, arguments);
  var that = this;
  var paymentSummary = {};
  this.setType(MessageButton.TYPE.BUY);

  if ( typeof arguments[0] === 'object' && 'type' in arguments[0] ) {
    var button = arguments[0];
    title = button.title;
    data = button.payload;
    paymentSummary = button.payment_summary;
  } else if ( arguments.length == 1 ) {
    throw new Error('This function require TITLE and postback data.');
  }

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

  this.setCurrency = function(currency) {
    paymentSummary['currency'] = currency;
    return that;
  }

  this.getCurrency = function() {
    return paymentSummary.currency;
  }

  this.isTestPayment = function(isTest) {
    if ( isTest != null ) {
      paymentSummary['is_test_payment'] = isTest;
      return that;
    }

    return (!!paymentSummary.is_test_payment);
  }

  this.setPaymentType = function(type) {
    var paymentType = Object.keys(MessageButton.PAYMENT_TYPE).map(function(value) {
      return MessageButton.PAYMENT_TYPE[value];
    }, []);
    if ( paymentType.indexOf(type) < 0 ) throw new Error('Not found payment type.');

    paymentSummary['payment_type'] = type;
    return that;
  }

  this.getPaymentType = function() {
    return paymentSummary.payment_type;
  }

  this.setMerchantName = function(name) {
    paymentSummary['merchant_name'] = name;
    return that;
  }

  this.getMerchantName = function() {
    return paymentSummary.merchant_name;
  }

  this.requestedShippingAddress = function() {
    if ( !paymentSummary['requested_user_info'] ) paymentSummary['requested_user_info'] = [];
    paymentSummary.requested_user_info.push('shipping_address');
    return that;
  }

  this.requestedContactName = function() {
    if ( !paymentSummary['requested_user_info'] ) paymentSummary['requested_user_info'] = [];
    paymentSummary.requested_user_info.push('contact_name');
    return that;
  }

  this.requestedContactPhone = function() {
    if ( !paymentSummary['requested_user_info'] ) paymentSummary['requested_user_info'] = [];
    paymentSummary.requested_user_info.push('contact_phone');
    return that;
  }

  this.requestedContactEmail = function() {
    if ( !paymentSummary['requested_user_info'] ) paymentSummary['requested_user_info'] = [];
    paymentSummary.requested_user_info.push('contact_email');
    return that;
  }

  this.getRequestedUserInfo = function() {
    return paymentSummary.requested_user_info;
  }

  this.addPriceList = function(label, amount) {
    if ( !paymentSummary['price_list'] ) paymentSummary['price_list'] = [];
    paymentSummary.price_list.push({
      label: label,
      amount: amount
    });
    return that;
  }

  this.getPriceList = function() {
    if ( !paymentSummary.price_list ) return [];

    return paymentSummary.price_list.map(function(list, i) {
      return {
        getLabel: function() { return list.label; },
        getAmount: function() { return (!list.amount)? 0: list.amount; }
      };
    }, []);
  }

  this.buildMessageButton = function() {
    if ( !title || !data ) throw new Error('This function require TITLE and postback data.');

    return {
      type: that.getType(),
      title: title,
      payload: data,
      payment_summary: paymentSummary
    };
  }
}

module.exports = BuyButton;
