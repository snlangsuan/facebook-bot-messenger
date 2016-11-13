var MessageButton = require('../button');

PostbackButton.prototype = new MessageButton();
PostbackButton.prototype.constructor = PostbackButton;

function PostbackButton(title, data) {
  MessageButton.apply(this, arguments);
  var that = this;
  this.setType(MessageButton.TYPE.POSTBACK);

  if ( typeof arguments[0] === 'object' && 'type' in arguments[0] ) {
    var button = arguments[0];
    title = button.title;
    data = button.payload;
  } else if ( arguments.length == 1 ) {
    throw new Error('This function require TITLE and postback data.');
  }

  this.setTitle = function(str) {
    title = str;
    return that;
  }

  this.getTitle = function() {
    return title;
  }

  this.setData = function(str) {
    data = str;
    return that;
  }

  this.getData = function() {
    return data;
  }

  this.buildMessageButton = function() {
    if ( !title || !data ) throw new Error('This function require TITLE and postback data.');

    return {
      type: that.getType(),
      title: title,
      payload: data
    };
  }
}

module.exports = PostbackButton;
