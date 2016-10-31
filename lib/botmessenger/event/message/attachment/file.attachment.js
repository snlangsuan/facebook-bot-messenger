var Attachment = require('../attachment');

FileAttachment.prototype = new Attachment();
FileAttachment.prototype.constructor = FileAttachment;

function FileAttachment(attachment) {
  Attachment.apply(this, arguments);
}

module.exports = FileAttachment;
