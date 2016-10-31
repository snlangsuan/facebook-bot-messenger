var BaseEvent = require('./base.event');

PaymentEvent.prototype = new BaseEvent();
PaymentEvent.prototype.constructor = PaymentEvent;

function PaymentEvent() {
  BaseEvent.apply(this, arguments);
  if ( arguments.length < 1 ) return;
  var event = arguments[2];
  BaseEvent.prototype.type = BaseEvent.TYPE.CHECKOUT_UPDATE;

  this.getData = function() {
    return event.payment.payload;
  }

  this.getShippingAddress = function() {
    return event.payment.requested_user_info.shipping_address;
  }

  this.getContactName = function() {
    return event.payment.requested_user_info.contact_name;
  }

  this.getContactMail = function() {
    return event.payment.requested_user_info.contact_email;
  }

  this.getContactPhone = function() {
    return event.payment.requested_user_info.contact_phone;
  }

  this.getAmount = function() {
    return event.payment.amount.amount;
  }

  this.getCurrency = function() {
    return event.payment.amount.currency;
  }

  this.getShippingId = function() {
    return event.payment.shipping_option_id;
  }

  this.getProvider = function() {
    return event.payment.payment_credential.provider_type;
  }

  this.getChargeId = function() {
    return ( !that.isTokenized(event.payment.payment_credential) )? event.payment.payment_credential.charge_id: null;
  }

  this.getTokenizedCard = function() {
    return ( that.isTokenized(event.payment.payment_credential) )? event.payment.payment_credential.tokenized_card: null;
  }

  this.getTokenizedCvv = function() {
    return ( that.isTokenized(event.payment.payment_credential) )? event.payment.payment_credential.tokenized_cvv: null;
  }

  this.getExpiryMonth = function() {
    return ( that.isTokenized(event.payment.payment_credential) )? event.payment.payment_credential.token_expiry_month: null;
  }

  this.getExpiryYear = function() {
    return ( that.isTokenized(event.payment.payment_credential) )? event.payment.payment_credential.token_expiry_year: null;
  }
}

PaymentEvent.prototype.isTokenized = function(credential) {
  return ( credential.provider_type == 'token' );
}

module.exports = PaymentEvent;
