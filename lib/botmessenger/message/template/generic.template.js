var Template = require('../template');
var GenericElementTemplate = require('./generic.element.template');

GenericTemplate.prototype = new Template();
GenericTemplate.prototype.constructor = GenericTemplate;

function GenericTemplate(elements) {
  Template.apply(this, arguments);
  var that = this;
  var templateType = Template.TYPE.GENERIC;
  var templateElements = [];
  if ( Array.isArray(elements) ) templateElements = elements;

  this.getTemplateType = function() {
    return templateType;
  }

  this.addElement = function(element) {
    templateElements.push(element);
    return that;
  }

  this.getElements = function() {
    var temp = that.getPayload();
    if ( Object.keys(temp).length > 0 && 'elements' in temp ) templateElements = temp.elements;
    return templateElements.map(function(element, i) {
      if ( element instanceof GenericElementTemplate ) return element;
      return new GenericElementTemplate(element);
    }, []);
  }

  this.buildTemplate = function() {
    for ( var i in templateElements ) {
      if ( !(templateElements[i] instanceof GenericElementTemplate) ) continue;
      templateElements[i] = templateElements[i].buildTemplate();
    }

    return {
      template_type: templateType,
      elements: templateElements
    };
  }
}

module.exports = GenericTemplate;
