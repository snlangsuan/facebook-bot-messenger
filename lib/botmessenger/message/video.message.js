var Message = require('../message');

VideoMessage.prototype = new Message();
VideoMessage.prototype.constructor = VideoMessage;

function VideoMessage(contentUrl) {
  var that = this;

  this.setResourceUrl = function(url) {
    contentUrl = url;

    return that;
  }

  this.getResourceUrl = function() {
    return contentUrl;
  }

  this.buildMessage = function() {
    var payload = {
      url: contentUrl
    };
    return that.buildAttachment(Message.ATTACHMENT_TYPE.IMAGE, payload);
  }
}

module.exports = VideoMessage;
