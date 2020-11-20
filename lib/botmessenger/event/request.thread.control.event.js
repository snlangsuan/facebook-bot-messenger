var BaseEvent = require("./base.event");

RequestThreadControlEvent.prototype = new BaseEvent();
RequestThreadControlEvent.prototype.constructor = RequestThreadControlEvent;

function RequestThreadControlEvent(pageId, timeOfEvent, event) {
  BaseEvent.apply(this, arguments);
  var that = this;
  this.setType(BaseEvent.TYPE.REQUEST_THREAD_CONTROL);

  this.getUserRef = function () {
    if (!that.getSenderId()) return null;
    return event.sender.id;
  };

  this.getRequestedOwnerAppId = function () {
    return event.request_thread_control.requested_owner_app_id;
  };

  this.getMetadata = function () {
    return event.request_thread_control.metadata;
  };
}

module.exports = RequestThreadControlEvent;
