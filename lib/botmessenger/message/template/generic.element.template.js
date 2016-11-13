function GenericElementTemplate(title, link, imageUrl, subtitle) {
  var element = {};
  if ( title != null && typeof title === 'string' ) element['title'] = title;
  if ( link != null ) element['item_url'] = link;
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

  this.setLink = function(url) {
    element['item_url'] = url;
    return that;
  }

  this.getLink = function() {
    return element.item_url;
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

module.exports = GenericElementTemplate;
