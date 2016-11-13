var Message = require('../message');

QuickRepliesMessage.prototype = new Message();
QuickRepliesMessage.prototype.constructor = QuickRepliesMessage;

function QuickRepliesMessage(text) {
  Message.apply(this, arguments);
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

  this.addImageOption = function(title, data, imageUrl) {
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

  this.getOptions = function() {
    return options.map(function(option) {
      var object = {
        getContentType: function() { return option.content_type; }
      };
      if ( !!option.title ) object.getTitle = function() { return option.title; };
      if ( !!option.image_url ) object.getImageUrl = function() { return option.image_url; };
      if ( !!option.payload ) object.getData = function() { return option.payload; };
      return object;
    }, []);
  }

  this.buildMessage = function() {
    return {
      text: text,
      quick_replies: options
    };
  }
}

module.exports = QuickRepliesMessage;
