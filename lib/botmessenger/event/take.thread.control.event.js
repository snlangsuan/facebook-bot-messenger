var BaseEvent = require("./base.event");

TakeThreadControlEvent.prototype = new BaseEvent();
TakeThreadControlEvent.prototype.constructor = TakeThreadControlEvent;

function TakeThreadControlEvent(pageId, timeOfEvent, event) {
  BaseEvent.apply(this, arguments);
  var that = this;
  this.setType(BaseEvent.TYPE.PASS_THREAD_CONTROL);

  this.getUserRef = function () {
    if (!that.getSenderId()) return null;
    return event.sender.id;
  };

  this.getPreviousOwnerAppId = function () {
    return event.take_thread_control.previous_owner_app_id;
  };

  this.getMetadata = function () {
    return event.take_thread_control.metadata;
  };
}

module.exports = TakeThreadControlEvent;
