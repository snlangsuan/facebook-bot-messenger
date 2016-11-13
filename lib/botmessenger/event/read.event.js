var BaseEvent = require('./base.event');

ReadEvent.prototype = new BaseEvent();
ReadEvent.prototype.constructor = ReadEvent;

function ReadEvent(pageId, timeOfEvent, event) {
  BaseEvent.apply(this, arguments);
  this.setType(BaseEvent.TYPE.MESSAGE_READ);

  this.getWatermark = function() {
    return event.read.watermark;
  }

  this.getMessageSeq = function() {
    return event.read.seq;
  }
}

module.exports = ReadEvent;
