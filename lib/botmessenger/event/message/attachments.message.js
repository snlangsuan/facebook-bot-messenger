var MessageEvent = require('../message.event');

AttachmentsMessage.prototype = new MessageEvent();
AttachmentsMessage.prototype.constructor = AttachmentsMessage;

AttachmentsMessage.prototype.attachmentTypeClass = {
  image: require('./attachment/image.attachment'),
  audio: require('./attachment/audio.attachment'),
  video: require('./attachment/video.attachment'),
  file: require('./attachment/file.attachment'),
  location: require('./attachment/location.attachment')
}

function AttachmentsMessage() {
  MessageEvent.apply(this, arguments);
  var event = arguments[2];
  var message = this.getMessage();
  var that = this;

  this.getAttachments = function() {
    if ( !('attachments' in message) ) return [];

    var attachmentType = MessageEvent.ATTACHMENT_TYPE;
    var attachments = [];
    for ( var i in message.attachments ) {
      var attachment = message.attachments[i];
      var type = attachment.type;
      var attachmentClass = that.attachmentTypeClass[type];
      if ( !attachmentClass ) {
        console.error('attachment type', type, 'not found');
        continue;
      }

      attachments.push(new attachmentClass(attachment));
    }

    return attachments;
  }
}

module.exports = AttachmentsMessage;
