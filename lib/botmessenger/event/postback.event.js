var BaseEvent = require('./base.event');

PostbackEvent.prototype = new BaseEvent();
PostbackEvent.prototype.constructor = PostbackEvent;

function PostbackEvent() {
  BaseEvent.apply(this, arguments);
  if ( arguments.length < 1 ) return;
  var event = arguments[2];
  BaseEvent.prototype.type = BaseEvent.TYPE.POSTBACK;

  this.getPostbackData = function() {
    return event.postback.payload;
  }
}

module.exports = PostbackEvent;
