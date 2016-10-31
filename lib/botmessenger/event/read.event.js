var BaseEvent = require('./base.event');

ReadEvent.prototype = new BaseEvent();
ReadEvent.prototype.constructor = ReadEvent;

function ReadEvent() {
  BaseEvent.apply(this, arguments);
  if ( arguments.length < 1 ) return;
  var event = arguments[2];
  BaseEvent.prototype.type = BaseEvent.TYPE.READ;

  this.getWatermark = function() {
    return event.read.watermark;
  }

  this.getMessageSeq = function() {
    return event.read.seq;
  }
}

module.exports = ReadEvent;
