var Attachment = require('../attachment');

FileAttachment.prototype = new Attachment();
FileAttachment.prototype.constructor = FileAttachment;

function FileAttachment(attachment) {
  Attachment.apply(this, arguments);
  var that = this;

  this.getContent = function() {
    return attachment.payload.url;
  }
}

module.exports = FileAttachment;
