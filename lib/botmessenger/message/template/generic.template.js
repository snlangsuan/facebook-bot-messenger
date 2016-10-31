var Template = require('../template');

GenericTemplate.prototype = new Template();
GenericTemplate.prototype.constructor = GenericTemplate;

function GenericTemplate(title, subTitle, link, thumbnailImageUrl, messageButtonBuilders) {
  var that = this;

  this.setTitle = function(str) {
    title = str;
    return that;
  }

  this.getTitle = function() {
    return title;
  }

  this.setSubTitle = function(sub) {
    subTitle = sub;
    return that;
  }

  this.getSubTitle = function() {
    return subTitle;
  }

  this.setLink = function(url) {
    link = url;
    return that;
  }

  this.getLink = function() {
    return link;
  }

  this.setThumbnailImageUrl = function(url) {
    thumbnailImageUrl = url;
    return that;
  }

  this.getThumbnailImageUrl = function() {
    return thumbnailImageUrl;
  }

  this.addMessageButton = function(buttonBuilder) {
    if ( !messageButtonBuilders ) messageButtonBuilders = [];
    messageButtonBuilders.push(buttonBuilder);
    return that;
  }

  this.buildTemplate = function() {
    var buttons = [];
    for ( var i in messageButtonBuilders ) {
      var button = messageButtonBuilders[i];
      buttons.push(button.buildMessageButtons());
    }

    return {
      template_type: Template.TYPE.GENERIC,
      elements: [{
        title: title,
        item_url: link,
        image_url: thumbnailImageUrl,
        subtitle: subTitle,
        buttons: buttons
      }]
    };
  }
}

module.exports = GenericTemplate;
