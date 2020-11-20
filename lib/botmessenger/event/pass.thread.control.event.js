var BaseEvent = require("./base.event");

PassThreadControlEvent.prototype = new BaseEvent();
PassThreadControlEvent.prototype.constructor = PassThreadControlEvent;

function PassThreadControlEvent(pageId, timeOfEvent, event) {
  BaseEvent.apply(this, arguments);
  var that = this;
  this.setType(BaseEvent.TYPE.PASS_THREAD_CONTROL);

  this.getUserRef = function () {
    if (!that.getSenderId()) return null;
    return event.sender.id;
  };

  this.getNewOwnerAppId = function () {
    return event.pass_thread_control.new_owner_app_id;
  };

  this.getMetadata = function () {
    return event.pass_thread_control.metadata;
  };
}

module.exports = PassThreadControlEvent;
