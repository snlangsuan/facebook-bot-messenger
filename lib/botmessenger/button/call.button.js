var MessageButton = require('../button');

CallButton.prototype = new MessageButton();
CallButton.prototype.constructor = CallButton;

function CallButton(title, phoneNumber) {
  MessageButton.apply(this, arguments);
  var that = this;
  this.setType(MessageButton.TYPE.CALL);

  if ( typeof arguments[0] === 'object' && 'type' in arguments[0] ) {
    var button = arguments[0];
    title = button.title;
    phoneNumber = button.payload;
  } else if ( arguments.length == 1 ) {
    throw new Error('This function require TITLE and PHONE NUMBER.');
  }

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

  this.buildMessageButton = function() {
    if ( !title || !phoneNumber ) throw new Error('This function require TITLE and postback data.');

    return {
      type: that.getType(),
      title: title,
      payload: phoneNumber
    };
  }
}

module.exports = CallButton;
