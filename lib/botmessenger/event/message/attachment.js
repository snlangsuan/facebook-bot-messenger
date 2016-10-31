Attachment.TYPE = {
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video',
  FILE: 'file',
  LOCATION: 'location'
};

function Attachment(attachment) {
  var that = this;

  this.getType = function() {
    return attachment.type;
  }

  if ( attachment && attachment.type != Attachment.TYPE.LOCATION ) {
    this.getContent = function() {
      return attachment.payload.url;
    }
  }
}

module.exports = Attachment;
