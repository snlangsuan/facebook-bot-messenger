var Template = require('../template');

ButtonTemplate.prototype = new Template();
ButtonTemplate.prototype.constructor = ButtonTemplate;

function ButtonTemplate(text, messageButtons) {
  Template.apply(this, arguments);
  var that = this;
  var templateType = Template.TYPE.BUTTON;
  if ( !messageButtons ) messageButtons = [];

  const messageButtonTypeClass = {
    web_url: require('../../button/url.button'),
    postback: require('../../button/postback.button'),
    phone_number: require('../../button/call.button'),
    element_share: require('../../button/share.button'),
    payment: require('../../button/buy.button'),
    account_link: require('../../button/account.link.button'),
    account_unlink: require('../../button/account.unlink.button')
  };

  this.setText = function(str) {
    text = str;
    return that;
  }

  this.getText = function() {
    if ( (temp = that.getPayload()) != null ) text = temp.text;

    return text;
  }

  this.addButton = function(button) {
    messageButtons.push(button);
    return that;
  }

  this.addURLButton = function(title, link) {
    var button = new messageButtonTypeClass['web_url'](title, link);
    return that.addButton(button);
  }

  this.addPostbackButton = function(title, data) {
    var button = new messageButtonTypeClass['postback'](title, data);
    return that.addButton(button);
  }

  this.getButtons = function() {
    var temp = that.getPayload();
    if ( Object.keys(temp).length > 0 ) {
      messageButtons = [];
      for ( var i in temp.buttons ) {
        var button = temp.buttons[i];
        var messageButtonClass = messageButtonTypeClass[button.type];
        if ( !messageButtonClass ) continue;
        messageButtons.push(new messageButtonClass(button));
      }
    }

    return messageButtons;
  }

  this.buildTemplate = function() {
    var buttons = [];
    for ( var i in messageButtons ) {
      buttons.push(messageButtons[i].buildMessageButton());
    }

    return {
      template_type: templateType,
      text: text,
      buttons: buttons
    };
  }
}

module.exports = ButtonTemplate;
