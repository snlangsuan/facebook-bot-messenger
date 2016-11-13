var Media = require('../media');

AudioAttachment.prototype = new Media();
AudioAttachment.prototype.constructor = AudioAttachment;

function AudioAttachment() {
  Media.apply(this, arguments);
  this.setType('audio');
}

module.exports = AudioAttachment;
