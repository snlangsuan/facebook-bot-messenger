var Attachment = require('../attachment');

ImageAttachment.prototype = new Attachment();
ImageAttachment.prototype.constructor = ImageAttachment;

function ImageAttachment(attachment) {
  Attachment.apply(this, arguments);
  var that = this;

  this.getContent = function() {
    return attachment.payload.url;
  }
}

module.exports = ImageAttachment;
