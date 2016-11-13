var BaseEvent = require('./base.event');

PaymentEvent.prototype = new BaseEvent();
PaymentEvent.prototype.constructor = PaymentEvent;

function PaymentEvent(pageId, timeOfEvent, event) {
  BaseEvent.apply(this, arguments);
  this.setType(BaseEvent.TYPE.PAYMENTS);
  var that = this;

  var isTokenized = function(credential) {
    return ( credential.provider_type == 'token' );
  }

  this.getData = function() {
    return event.payment.payload;
  }

  this.getShippingAddress = function() {
    if ( !event.payment['requested_user_info'] || !event.payment.requested_user_info['shipping_address'] ) return null;
    var shippingAddress = event.payment.requested_user_info.shipping_address;
    var streets = [shippingAddress.street_1];
    if ( shippingAddress.street_2 != null ) streets.push(shippingAddress.street_2);
    return {
      getStreets: function() { return streets; },
      getCity: function() { return shippingAddress.city; },
      getState: function() { return shippingAddress.state; },
      getPostalCode: function() { return shippingAddress.postal_code; },
      getCountry: function() { return shippingAddress.country; }
    };
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
    var credential = event.payment.payment_credential;
    return ( !isTokenized(credential) )? credential.charge_id: null;
  }

  this.getTokenizedCard = function() {
    var credential = event.payment.payment_credential;
    return ( isTokenized(credential) )? credential.tokenized_card: null;
  }

  this.getTokenizedCvv = function() {
    var credential = event.payment.payment_credential;
    return ( isTokenized(credential) )? credential.tokenized_cvv: null;
  }

  this.getExpiryMonth = function() {
    var credential = event.payment.payment_credential;
    return ( isTokenized(credential) )? credential.token_expiry_month: null;
  }

  this.getExpiryYear = function() {
    var credential = event.payment.payment_credential;
    return ( isTokenized(credential) )? credential.token_expiry_year: null;
  }
}

module.exports = PaymentEvent;
