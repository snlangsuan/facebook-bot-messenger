var BaseEvent = require('./base.event');

ReferralEvent.prototype = new BaseEvent();
ReferralEvent.prototype.constructor = ReferralEvent;

function ReferralEvent(pageId, timeOfEvent, event) {
  BaseEvent.apply(this, arguments);
  this.setType(BaseEvent.TYPE.REFERRAL);

  this.getRefData = function() {
    return event.referral.ref;
  }

  this.getSource = function() {
    return event.referral.source;
  }

  this.getType = function() {
    return event.referral.type;
  }
}

module.exports = ReferralEvent;
