var MessageButtons = require('../button');

URLButton.prototype = new MessageButtons();
URLButton.prototype.constructor = URLButton;

function URLButton(title, link, webviewHeight, fallback) {
  var that = this;

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
    webviewHeight = height;
    return that;
  }

  this.getWebviewHeight = function() {
    return webviewHeight
  }

  this.setFallbackLink = function(url) {
    fallback = url;
    return that;
  }

  this.getFallbackLink = function() {
    return fallback;
  }

  this.buildMessageButtons = function() {
    var button = {
      type: MessageButtons.TYPE.URL,
      url: link,
      title: title
    };
    if ( webviewHeight ) button.webview_height_ratio = webviewHeight;
    if ( !fallback ) return button;
    button.messenger_extensions = true;
    button.fallback_url = fallback;

    return button;
  }
}

module.exports = URLButton;
