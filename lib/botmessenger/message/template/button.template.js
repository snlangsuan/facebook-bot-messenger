var Template = require('../template');

ButtonTemplate.prototype = new Template();
ButtonTemplate.prototype.constructor = ButtonTemplate;

function ButtonTemplate(text, messageButtonBuilders) {
  var that = this;

  this.setText = function(str) {
    text = str;
    return that;
  }

  this.getText = function() {
    return text;
  }

  this.addMessageButton = function(buttonBuilder) {
    if ( !messageButtonBuilders ) messageButtonBuilders = [];
    messageButtonBuilders.push(buttonBuilder);
    return that;
  }

  this.buildTemplate = function() {
    var buttons = [];
    for ( var i in messageButtonBuilders ) {
      var button = messageButtonBuilders[i];
      buttons.push(button.buildMessageButtons());
    }

    return {
      template_type: Template.TYPE.BUTTON,
      text: text,
      buttons: buttons
    };
  }
}

module.exports = ButtonTemplate;
