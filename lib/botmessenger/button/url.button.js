var MessageButton = require('../button');

URLButton.prototype = new MessageButton();
URLButton.prototype.constructor = URLButton;
URLButton.HEIGHT_RATIO = MessageButton.HEIGHT_RATIO;

function URLButton(title, link, webviewHeight, fallback) {
  MessageButton.apply(this, arguments);
  var that = this;
  var messengerExtensions = false;
  this.setType(MessageButton.TYPE.URL);

  if ( typeof arguments[0] === 'object' && 'type' in arguments[0] ) {
    var button = arguments[0];
    title = button.title;
    link = button.url;
    webviewHeight = button.webview_height_ratio;
    fallback = button.fallback_url;
    messengerExtensions = (!button.messenger_extensions)? false: button.messenger_extensions;
  } else if ( arguments.length == 1 ) {
    throw new Error('This function require TITLE and URL.');
  }

  this.setTitle = function(str) {
    title = str;
    return that;
  }

  this.getTitle = function() {
    return title;
  }

  this.setLink = function(url) {
    link = url;
    return that;
  }

  this.getLink = function() {
    return link;
  }

  this.setWebviewHeight = function(height) {
    var heightRatio = Object.keys(MessageButton.HEIGHT_RATIO).map(function(element) {
      return MessageButton.HEIGHT_RATIO[element];
    }, []);
    if ( heightRatio.indexOf(height) < 0 ) throw new Error('Invalid value webview_height_ratio.');
    webviewHeight = height;
    return that;
  }

  this.getWebviewHeight = function() {
    return webviewHeight;
  }

  this.isMessengerExtensions = function(enable) {
    if ( enable != null ) {
      messengerExtensions = enable;
      return that;
    }
    return messengerExtensions;
  }

  this.setFallbackLink = function(url) {
    fallback = url;
    return that;
  }

  this.getFallbackLink = function() {
    return fallback;
  }

  this.buildMessageButton = function() {
    var button = {
      type: that.getType(),
      url: link
    };

    if ( title != null ) button.title = title;
    if ( webviewHeight != null ) button.webview_height_ratio = webviewHeight;
    if ( messengerExtensions ) button.messenger_extensions = true;
    if ( fallback != null ) button.fallback_url = fallback;

    return button;
  }
}

module.exports = URLButton;
