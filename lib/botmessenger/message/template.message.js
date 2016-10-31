
var Message = require('../message');

TemplateMessage.prototype = new Message();
TemplateMessage.prototype.constructor = TemplateMessage;

function TemplateMessage(template) {
  var that = this;

  this.buildMessage = function() {
    return that.buildAttachment(Message.ATTACHMENT_TYPE.TEMPLATE, template.buildTemplate());
  }
}

module.exports = TemplateMessage;
