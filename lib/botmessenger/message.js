Message.ACTION = {
  READED: 'mark_seen',
  TYPING_ON: 'typing_on',
  TYPING_OFF: 'typing_off'
};

Message.ATTACHMENT_TYPE = {
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video',
  FILE: 'file',
  TEMPLATE: 'template',
  LOCATION: 'location'
}

function Message() {
  var that = this;
  var metadata;

  this.setMetadata = function(data) {
    metadata = data;
  }

  this.getMetadata = function() {
    return metadata;
  }
}

module.exports = Message;
