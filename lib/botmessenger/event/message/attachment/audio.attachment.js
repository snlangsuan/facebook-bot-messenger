var Attachment = require('../attachment');

AudioAttachment.prototype = new Attachment();
AudioAttachment.prototype.constructor = AudioAttachment;

function AudioAttachment(attachment) {
  Attachment.apply(this, arguments);
  var that = this;

  this.getContent = function() {
    return attachment.payload.url;
  }
}

module.exports = AudioAttachment;
