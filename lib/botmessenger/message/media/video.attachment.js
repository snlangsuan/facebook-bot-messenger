var Media = require('../media');

VideoAttachment.prototype = new Media();
VideoAttachment.prototype.constructor = VideoAttachment;

function VideoAttachment() {
  Media.apply(this, arguments);
  this.setType('video');
}

module.exports = VideoAttachment;
