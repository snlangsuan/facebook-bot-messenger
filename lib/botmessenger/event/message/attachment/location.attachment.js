var Attachment = require('../attachment');

LocationAttachment.prototype = new Attachment();
LocationAttachment.prototype.constructor = LocationAttachment;

function LocationAttachment(attachment) {
  Attachment.apply(this, arguments);
  var that = this;

  this.getTitle = function() {
    return attachment.title;
  }

  this.getLocationLink = function() {
    return attachment.url;
  }

  this.getLatitude = function() {
    return attachment.payload.coordinates.lat;
  }

  this.getLongitude = function() {
    return attachment.payload.coordinates.long;
  }
}

module.exports = LocationAttachment;
