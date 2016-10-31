var Attachment = require('../attachment');

AudioAttachment.prototype = new Attachment();
AudioAttachment.prototype.constructor = AudioAttachment;

function AudioAttachment(attachment) {
  Attachment.apply(this, arguments);
}

module.exports = AudioAttachment;
