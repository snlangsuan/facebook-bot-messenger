var Message = require('../message');

var ImageAttachment = require('./media/image.attachment');
var AudioAttachment = require('./media/audio.attachment');
var VideoAttachment = require('./media/video.attachment');
var FileAttachment = require('./media/file.attachment');
var TemplateType = require('./template').TYPE;

AttachmentMessage.prototype = new Message();
AttachmentMessage.prototype.constructor = AttachmentMessage;

function AttachmentMessage(attachment) {
  Message.apply(this, arguments);
  var that = this;

  this.addImageAttachment = function(content, reusable) {
    attachment = new ImageAttachment(content, reusable);
  }

  this.addAudioAttachment = function(content, reusable) {
    attachment = new AudioAttachment(content, reusable);
  }

  this.addVideoAttachment = function(content, reusable) {
    attachment = new VideoAttachment(content, reusable);
  }

  this.addFileAttachment = function(content, reusable) {
    attachment = new FileAttachment(content, reusable);
  }

  this.addTemplateAttachment = function(content) {
    attachment = content;
  }

  this.buildMessage = function() {
    if ( !attachment ) throw new Error('Invalid attachment object.');

    var message = {
      attachment: attachment.buildAttachment()
    };
    if ( (metadata = that.getMetadata()) != null ) message.metadata = metadata;

    return message;
  }
}

module.exports = AttachmentMessage;
