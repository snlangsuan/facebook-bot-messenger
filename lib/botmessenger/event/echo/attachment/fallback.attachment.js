function FallbackAttachment(attachment) {
  var that = this;

  this.getType = function() {
    return attachment.type;
  }

  this.getTitle = function() {
    return attachment.title;
  }

  this.getLink = function() {
    return attachment.url;
  }

  this.getData = function() {
    return attachment.payload;
  }
}

module.exports = FallbackAttachment;
