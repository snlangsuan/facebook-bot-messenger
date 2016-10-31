var BaseEvent = require('./base.event');

CheckoutUpdateEvent.prototype = new BaseEvent();
CheckoutUpdateEvent.prototype.constructor = CheckoutUpdateEvent;

function CheckoutUpdateEvent() {
  BaseEvent.apply(this, arguments);
  if ( arguments.length < 1 ) return;
  var event = arguments[2];
  BaseEvent.prototype.type = BaseEvent.TYPE.CHECKOUT_UPDATE;

  this.getData = function() {
    return event.checkout_update.payload;
  }

  this.getShippingId = function() {
    return event.checkout_update.shipping_address.id;
  }

  this.getShippingAddress = function() {
    var address = {};
    var shipping_address = event.checkout_update.shipping_address;
    for ( var i in shipping_address ) {
      if ( i == 'id' ) continue;
      address[i] = shipping_address[i];
    }
    return address;
  }
}

module.exports = CheckoutUpdateEvent;
