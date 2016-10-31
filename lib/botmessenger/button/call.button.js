var MessageButtons = require('../button');

CallButton.prototype = new MessageButtons();
CallButton.prototype.constructor = CallButton;

function CallButton(title, phoneNumber) {
  var that = this;

  this.setTitle = function(str) {
    title = str;
    return that;
  }

  this.getTitle = function() {
    return title;
  }

  this.setPhoneNumber = function(number) {
    phoneNumber = str;
    return that;
  }

  this.getPhoneNumber = function() {
    return phoneNumber;
  }

  this.buildMessageButtons = function() {
    return {
      type: MessageButtons.TYPE.CALL,
      title: title,
      payload: phoneNumber
    }
  }
}

module.exports = CallButton;
