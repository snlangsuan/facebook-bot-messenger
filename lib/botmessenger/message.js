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
  TEMPLATE: 'template'
};

function Message() {
}

Message.prototype.buildAttachment = function(type, payload) {
  return {
    attachment: {
      type: type,
      payload: payload
    }
  };
}

module.exports = Message;
