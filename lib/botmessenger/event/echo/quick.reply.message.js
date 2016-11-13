var EchoEvent = require('../echo.event');

QuickReplyMessage.prototype = new EchoEvent();
QuickReplyMessage.prototype.constructor = QuickReplyMessage;

function QuickReplyMessage(pageId, timeOfEvent, event) {
  EchoEvent.apply(this, arguments);
  var that = this;

  this.getText = function() {
    return ('text' in event.message)? event.message.text: null;
  }

  this.getQuickReplies = function() {
    var quickReplies = [];
    if ( 'quick_replies' in event.message ) {
      quickReplies = event.message.quick_replies.map(function(option) {
        var object = {
          getContentType: function() { return option.content_type; }
        };
        if ( !!option.title ) object.getTitle = function() { return option.title; };
        if ( !!option.image_url ) object.getImageUrl = function() { return option.image_url; };
        if ( !!option.payload ) object.getData = function() { return option.payload; };
        return object;
      }, []);
    }

    return quickReplies;
  }
}

module.exports = QuickReplyMessage;
