var Template = require('../template');
var ListElementTemplate = require('./list.element.template');

ListTemplate.prototype = new Template();
ListTemplate.prototype.constructor = ListTemplate;

function ListTemplate(elements) {
  Template.apply(this, arguments);
  var that = this;
  var templateType = Template.TYPE.LIST;
  var buttons = [];
  var topElementStyle = 'compact';
  if ( !elements ) elements = [];

  const messageButtonTypeClass = {
    web_url: require('../../button/url.button'),
    postback: require('../../button/postback.button'),
    phone_number: require('../../button/call.button'),
    element_share: require('../../button/share.button'),
    payment: require('../../button/buy.button'),
    account_link: require('../../button/account.link.button'),
    account_unlink: require('../../button/account.unlink.button')
  };

  this.getTemplateType = function() {
    return templateType;
  }

  this.isLargeTopElement = function(isLarge) {
    if ( isLarge != null ) {
      topElementStyle = (!isLarge)? 'compact':'large';
      return that;
    }
    return (topElementStyle == 'large');
  }

  this.addElement = function(element) {
    elements.push(element);
    return that;
  }

  this.getElements = function() {
    var temp = that.getPayload();
    if ( Object.keys(temp).length > 0 && 'elements' in temp ) elements = temp.elements;
    return elements.map(function(element, i) {
      if ( element instanceof ListElementTemplate ) return element;
      return new ListElementTemplate(element);
    }, []);
  }

  this.addButton = function(button) {
    buttons.push(button.buildMessageButton());
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
    var temp = [];
    buttons.forEach(function(button) {
      var messageButtonClass = messageButtonTypeClass[button.type];
      if ( messageButtonClass != null ) temp.push(new messageButtonClass(button));
    });
    return temp;
  }

  this.buildTemplate = function() {
    for ( var i in elements ) {
      if ( !(elements[i] instanceof ListElementTemplate) ) continue;
      elements[i] = elements[i].buildTemplate();
    }

    return {
      template_type: templateType,
      top_element_style: topElementStyle,
      elements: elements,
      buttons: buttons
    };
  }
}

module.exports = ListTemplate;
