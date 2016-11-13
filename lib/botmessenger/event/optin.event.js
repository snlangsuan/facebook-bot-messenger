var BaseEvent = require('./base.event');

OptinEvent.prototype = new BaseEvent();
OptinEvent.prototype.constructor = OptinEvent;

function OptinEvent(pageId, timeOfEvent, event) {
  BaseEvent.apply(this, arguments);
  this.setType(BaseEvent.TYPE.OPTIN);

  this.getRefData = function() {
    return event.optin.ref;
  }
}

module.exports = OptinEvent;
