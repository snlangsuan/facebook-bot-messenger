function Attachment(attachment) {
  var that = this;

  this.getType = function() {
    return attachment.type;
  }
}

module.exports = Attachment;
