var Attachment = require('../attachment');

LocationAttachment.prototype = new Attachment();
LocationAttachment.prototype.constructor = LocationAttachment;

function LocationAttachment(attachment) {
  Attachment.apply(this, arguments);
  var that = this;

  this.getLatitude = function() {
    return attachment.payload.coordinates.lat;
  }

  this.getLongitude = function() {
    return attachment.payload.coordinates.long;
  }
}

module.exports = LocationAttachment;
