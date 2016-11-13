var URLButton = require('../../button/url.button');

function ListElementTemplate(title, imageUrl, subtitle) {
  var element = {};
  if ( title != null && typeof title === 'string' ) element['title'] = title;
  if ( imageUrl != null ) element['image_url'] = imageUrl;
  if ( subtitle != null ) element['subtitle'] = subtitle;
  if ( typeof arguments[0] === 'object' && 'title' in arguments[0] ) element = arguments[0];
  var that = this;
  const messageButtonTypeClass = {
    web_url: require('../../button/url.button'),
    postback: require('../../button/postback.button'),
    phone_number: require('../../button/call.button'),
    element_share: require('../../button/share.button'),
    payment: require('../../button/buy.button'),
    account_link: require('../../button/account.link.button'),
    account_unlink: require('../../button/account.unlink.button')
  };

  this.setTitle = function(str) {
    element['title'] = str;
    return that;
  }

  this.getTitle = function() {
    return element.title;
  }

  this.setImageUrl = function(url) {
    element['image_url'] = url;
    return that;
  }

  this.getImageUrl = function() {
    return element.image_url;
  }

  this.setSubtitle = function(str) {
    element['subtitle'] = str;
    return that;
  }

  this.getSubtitle = function() {
    return element.subtitle;
  }

  this.setDefaultAction = function(url, fallbackUrl, messengerExtensions, webviewHeightRatio) {
    var button = new URLButton();
    button.setLink(url);
    if ( !!fallbackUrl ) button.setFallbackLink(fallbackUrl);
    if ( !!messengerExtensions ) button.isMessengerExtensions(true);
    if ( !!webviewHeightRatio ) button.setWebviewHeight(webviewHeightRatio);

    element['default_action'] = button.buildMessageButton();
    return that;
  }

  this.getDefaultAction = function() {
    if ( !element.default_action ) return null;
    return {
      getLink: function() { return element.default_action.url; },
      getFallbackLink: function() { return element.default_action.fallback_url; },
      isMessengerExtensions: function() { return (!!element.default_action.messenger_extensions); },
      getWebviewHeight: function() { return element.default_action.webview_height_ratio; }
    };
  }

  this.addButton = function(button) {
    if ( !element.buttons ) element['buttons'] = [];
    element.buttons.push(button.buildMessageButton());
    return that;
  }

  this.addURLButton = function(title, link) {
    var button = new messageButtonTypeClass['web_url'](title, link);
    return that.addButton(button);
  }

  this.addPostbackButton = function(title, data) {
    var button = new messageButtonTypeClass['postback'](title, data);
    return that.addButton(button);
  }

  this.getButtons = function() {
    if ( !element.buttons ) return [];
    var buttons = [];
    element.buttons.forEach(function(button) {
      var messageButtonClass = messageButtonTypeClass[button.type];
      if ( messageButtonClass != null ) buttons.push(new messageButtonClass(button));
    });
    return buttons;
  }

  this.buildTemplate = function() {
    return element;
  }
}

module.exports = ListElementTemplate;
