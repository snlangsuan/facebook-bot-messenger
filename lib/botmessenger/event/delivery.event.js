var BaseEvent = require('./base.event');

DeliveryEvent.prototype = new BaseEvent();
DeliveryEvent.prototype.constructor = DeliveryEvent;

function DeliveryEvent() {
  BaseEvent.apply(this, arguments);
  if ( arguments.length < 1 ) return;
  var event = arguments[2];
  BaseEvent.prototype.type = BaseEvent.TYPE.DELIVERY;

  this.getMessageIds = function() {
    return event.delivery.mids;
  }

  this.getWatermark = function() {
    return event.delivery.watermark;
  }

  this.getMessageSeq = function() {
    return event.delivery.seq;
  }
}

module.exports = DeliveryEvent;
