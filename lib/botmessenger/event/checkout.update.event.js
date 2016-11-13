var BaseEvent = require('./base.event');

CheckoutUpdateEvent.prototype = new BaseEvent();
CheckoutUpdateEvent.prototype.constructor = CheckoutUpdateEvent;

function CheckoutUpdateEvent(pageId, timeOfEvent, event) {
  BaseEvent.apply(this, arguments);
  this.setType(BaseEvent.TYPE.CHECKOUT_UPDATE);

  this.getData = function() {
    return event.checkout_update.payload;
  }

  this.getShippingId = function() {
    return event.checkout_update.shipping_address.id;
  }

  this.getShippingAddress = function() {
    if ( !event.checkout_update['shipping_address'] ) return null;
    var shippingAddress = event.checkout_update.shipping_address;
    var streets = [shippingAddress.street1];
    if ( shippingAddress.street2 != null ) streets.push(shippingAddress.street2);
    return {
      getStreets: function() { return streets; },
      getCity: function() { return shippingAddress.city; },
      getState: function() { return shippingAddress.state; },
      getPostalCode: function() { return shippingAddress.postal_code; },
      getCountry: function() { return shippingAddress.country; }
    };
  }
}

module.exports = CheckoutUpdateEvent;
