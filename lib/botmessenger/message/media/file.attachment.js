var Media = require('../media');

FileAttachment.prototype = new Media();
FileAttachment.prototype.constructor = FileAttachment;

function FileAttachment() {
  Media.apply(this, arguments);
  this.setType('file');
}

module.exports = FileAttachment;
