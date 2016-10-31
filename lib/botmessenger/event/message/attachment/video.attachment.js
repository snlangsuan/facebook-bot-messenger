var Attachment = require('../attachment');

VideoAttachment.prototype = new Attachment();
VideoAttachment.prototype.constructor = VideoAttachment;

function VideoAttachment(attachment) {
  Attachment.apply(this, arguments);
}

module.exports = VideoAttachment;
