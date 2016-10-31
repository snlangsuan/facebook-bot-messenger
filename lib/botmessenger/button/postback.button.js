var MessageButtons = require('../button');

PostbackButton.prototype = new MessageButtons();
PostbackButton.prototype.constructor = PostbackButton;

function PostbackButton(title, data) {
  var that = this;

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

  this.buildMessageButtons = function() {
    return {
      type: MessageButtons.TYPE.POSTBACK,
      title: title,
      payload: data
    }
  }
}

module.exports = PostbackButton;
