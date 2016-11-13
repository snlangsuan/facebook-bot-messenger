var Attachment = require('../attachment');

VideoAttachment.prototype = new Attachment();
VideoAttachment.prototype.constructor = VideoAttachment;

function VideoAttachment(attachment) {
  Attachment.apply(this, arguments);
  var that = this;

  this.getContent = function() {
    return attachment.payload.url;
  }
}

module.exports = VideoAttachment;
