var Message = require('../message');

QuickRepliesMessage.prototype = new Message();
QuickRepliesMessage.prototype.constructor = QuickRepliesMessage;

function QuickRepliesMessage(text) {
  var that = this;
  var options = [];

  this.setText = function(str) {
    text = str;
    return that;
  }

  this.getText = function() {
    return text;
  }

  this.addTextOption = function(title, data) {
    options.push({
      content_type: 'text',
      title: title,
      payload: data
    });
    return that;
  }

  this.addImageOption = function(title, imageUrl, data) {
    options.push({
      content_type: 'text',
      title: title,
      image_url: imageUrl,
      payload: data
    });
    return that;
  }

  this.addLocationOption = function() {
    options.push({
      content_type: 'location'
    });
    return that;
  }

  this.buildMessage = function() {
    return {
      text: text,
      quick_replies: options
    };
  }
}

module.exports = QuickRepliesMessage;
