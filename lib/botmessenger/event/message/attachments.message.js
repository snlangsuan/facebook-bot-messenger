var MessageEvent = require('../message.event');

AttachmentsMessageEvent.prototype = new MessageEvent();
AttachmentsMessageEvent.prototype.constructor = AttachmentsMessageEvent;

function AttachmentsMessageEvent(pageId, timeOfEvent, event) {
  MessageEvent.apply(this, arguments);
  var that = this;

  const attachmentTypeClass = {
    image: require('./attachment/image.attachment'),
    audio: require('./attachment/audio.attachment'),
    video: require('./attachment/video.attachment'),
    file: require('./attachment/file.attachment'),
    location: require('./attachment/location.attachment')
  };

  this.getAttachments = function() {
    var attachments = [];
    event.message.attachments.forEach(function(attachment) {
      var attachmentClass = attachmentTypeClass[attachment.type];
      if ( attachmentClass != null ) attachments.push(new attachmentClass(attachment));
    });
    return attachments
  }
}

module.exports = AttachmentsMessageEvent;
