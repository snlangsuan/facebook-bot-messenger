var BaseEvent = require('./base.event');

DeliveryEvent.prototype = new BaseEvent();
DeliveryEvent.prototype.constructor = DeliveryEvent;

function DeliveryEvent(pageId, timeOfEvent, event) {
  BaseEvent.apply(this, arguments);
  this.setType(BaseEvent.TYPE.MESSAGE_DELIVERED);

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
