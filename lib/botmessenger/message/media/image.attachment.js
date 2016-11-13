var Media = require('../media');

ImageAttachment.prototype = new Media();
ImageAttachment.prototype.constructor = ImageAttachment;

function ImageAttachment() {
  Media.apply(this, arguments);
  this.setType('image');
}

module.exports = ImageAttachment;
