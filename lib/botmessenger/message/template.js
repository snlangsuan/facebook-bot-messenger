Template.TYPE = {
  GENERIC: 'generic',
  LIST: 'list',
  BUTTON: 'button',
  RECEIPT: 'receipt'
};

function Template(content) {
  var attachmentType = 'template';
  var payload = {};
  var that = this;

  if ( typeof content === 'object' && 'type' in content && 'payload' in content ) {
    attachmentType = content.type;
    payload = content.payload;
  }

  this.getType = function() {
    return attachmentType;
  }

  this.setPayload = function(content) {
    payload = content;
    return that;
  }

  this.getPayload = function() {
    return payload;
  }

  this.buildAttachment = function() {
    if ( Object.keys(payload).length < 1 ) payload = that.buildTemplate();

    return {
      type: attachmentType,
      payload: payload
    };
  }
}

module.exports = Template;
