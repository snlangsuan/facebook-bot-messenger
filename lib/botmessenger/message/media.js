function Media(content, reusable) {
  var payload = {};
  var attachmentType = null;

  if ( typeof content === 'object' && 'type' in content && 'payload' in content ) {
    attachmentType = content.type;
    payload = content.payload;
  } else if ( !isNaN(Number(content) ) ) {
    payload.attachment_id = content;
  } else {
    payload.url = content;
    if ( reusable ) payload.is_reusable = reusable;
  }
  var that = this;

  this.setType = function(type) {
    attachmentType = type;
    return that;
  }

  this.getType = function() {
    return attachmentType;
  }

  this.setContent = function(url) {
    delete payload['attachment_id'];

    payload.url = url;
    return that;
  }

  this.getContent = function() {
    return payload.url;
  }

  this.setAttachmentId = function(id) {
    delete payload['url'];

    payload.attachment_id = id;
    return that;
  }

  this.getAttachmentId = function() {
    return ( !payload.attachment_id )? 0: payload.attachment_id;
  }

  this.isReusable = function(reusable) {
    if ( reusable != null ) {
      payload.is_reusable = reusable;
      return that;
    }

    return ( !!payload.is_reusable );
  }

  this.buildAttachment = function() {
    return {
      type: attachmentType,
      payload: payload
    };
  }
}

module.exports = Media;
