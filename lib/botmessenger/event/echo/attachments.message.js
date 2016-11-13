var EchoEvent = require('../echo.event');

AttachmentsMessage.prototype = new EchoEvent();
AttachmentsMessage.prototype.constructor = AttachmentsMessage;

function AttachmentsMessage(pageId, timeOfEvent, event) {
  EchoEvent.apply(this, arguments);
  var that = this;

  const attachmentTypeClass = {
    image: require('../../message/media/image.attachment'),
    audio: require('../../message/media/audio.attachment'),
    video: require('../../message/media/video.attachment'),
    file: require('../../message/media/file.attachment'),
    template: require('../../message/template'),
    fallback: require('./attachment/fallback.attachment')
  };

  const templateTypeClass = {
    generic: require('../../message/template/generic.template'),
    list: require('../../message/template/list.template'),
    button: require('../../message/template/button.template'),
    receipt: require('../../message/template/receipt.template')
  };

  var getTemplateType = function(attachment) {
    if ( 'payload' in attachment ) return attachment.payload.template_type;
    return false;
  }

  this.getAttachments = function() {
    var attachments = [];
    for ( var i in event.message.attachments ) {
      var attachment = event.message.attachments[i];
      var attachmentClass = attachmentTypeClass[attachment.type];
      if ( !attachmentClass ) continue;

      if ( attachment.type === 'template' ) {
        var templateType = getTemplateType(attachment);
        var templateClass = templateTypeClass[templateType];
        if ( templateClass != null ) attachments.push(new templateClass(attachment));
        continue;
      }

      attachments.push(new attachmentClass(attachment));
    }
    return attachments
  }
}

module.exports = AttachmentsMessage;
