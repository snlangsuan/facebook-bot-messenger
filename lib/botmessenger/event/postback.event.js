var BaseEvent = require('./base.event');

PostbackEvent.prototype = new BaseEvent();
PostbackEvent.prototype.constructor = PostbackEvent;

function PostbackEvent(pageId, timeOfEvent, event) {
  BaseEvent.apply(this, arguments);
  this.setType(BaseEvent.TYPE.POSTBACK);

  this.getPostbackData = function() {
    return event.postback.payload;
  }
}

module.exports = PostbackEvent;
