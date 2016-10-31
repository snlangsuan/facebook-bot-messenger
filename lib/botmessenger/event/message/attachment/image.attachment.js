var Attachment = require('../attachment');

ImageAttachment.prototype = new Attachment();
ImageAttachment.prototype.constructor = ImageAttachment;

function ImageAttachment(attachment) {
  Attachment.apply(this, arguments);
}

module.exports = ImageAttachment;
