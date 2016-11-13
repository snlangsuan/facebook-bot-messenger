var Template = require('../template');

ReceiptTemplate.prototype = new Template();
ReceiptTemplate.prototype.constructor = ReceiptTemplate;

function ReceiptTemplate(recipientName, orderNumber, currency, paymentMethod) {
  Template.apply(this, arguments);
  var that = this;
  var template = {
    template_type: Template.TYPE.RECEIPT,
    recipient_name: recipientName,
    order_number: orderNumber,
    currency: currency,
    payment_method: paymentMethod,
    summary: {}
  };
  if ( Object.keys(this.getPayload()).length > 0 ) template = this.getPayload();

  this.setRecipientName = function(name) {
    template.template_type = name;
    return that;
  }

  this.getRecipientName = function() {


    return template.template_type;
  }

  this.setOrderNumber = function(order) {
    template.order_number = order;
    return that;
  }

  this.getOrderNumber = function() {


    return template.order_number;
  }

  this.setCurrency = function(str) {
    template.currency = str;
    return that;
  }

  this.getCurrency = function() {


    return template.currency;
  }

  this.setPaymentMethod = function(method) {
    template.payment_method = method;
    return that;
  }

  this.getPaymentMethod = function() {
    return template.payment_method;
  }

  this.setSummary = function(totalCost, subtotal, shippingCost, totalTax) {
    template.summary['total_cost'] = totalCost;
    if ( subtotal != null ) template.summary['subtotal'] = subtotal;
    if ( shippingCost != null ) template.summary['shipping_cost'] = shippingCost;
    if ( totalTax != null ) template.summary['total_tax'] = totalTax;
    return that;
  }

  this.getSummary = function() {
    return {
      getTotalCost: function() { return (!template.summary.total_cost)? 0: template.summary.total_cost; },
      getSubtotal: function() { return (!template.summary.subtotal)? 0: template.summary.subtotal; },
      getShippingCost: function() { return (!template.summary.shipping_cost)? 0: template.summary.shipping_cost; },
      getTotalTax: function() { return (!template.summary.total_tax)? 0: template.summary.total_tax; }
    };
  }

  this.setMerchantName = function(name) {
    template['merchant_name'] = name;
    return that;
  }

  this.getMerchantName = function() {
    return template.merchant_name;
  }

  this.setTimestamp = function(timestamp) {
    template['timestamp'] = timestamp;
    return that;
  }

  this.getTimestamp = function() {
    return template.timestamp;
  }

  this.setOrderUrl = function(url) {
    template['order_url'] = url;
    return that;
  }

  this.getOrderUrl = function() {
    return template.order_url;
  }

  this.addElement = function(title, price, imageUrl, quantity, subtitle, currency) {
    if ( !template['elements'] ) template['elements'] = [];
    var element = {
      title: title,
      price: price
    };

    if ( imageUrl != null ) element['image_url'] = imageUrl;
    if ( quantity != null && parseInt(quantity) > 0 ) element['quantity'] = parseInt(quantity);
    if ( subtitle != null ) element['subtitle'] = subtitle;
    if ( currency != null ) element['currency'] = currency;

    template.elements.push(element);
    return that;
  }

  this.getElements = function() {
    if ( !template.elements ) return [];
    return template.elements.map(function(element, i) {
      return {
        getTitle: function() { return element.title; },
        getPrice: function() { return (!element.price)? 0: element.price; },
        getImageUrl: function() { return element.image_url; },
        getQuantity: function() { return (!element.quantity)? 0: element.quantity; },
        getSubtitle: function() { return element.subtitle; },
        getCurrency: function() { return element.currency; }
      };
    }, []);
  }

  this.setAddress = function(streets, city, state, postalCode, country) {
    if ( !template['address'] ) template['address'] = {};
    if ( !Array.isArray(streets) ) throw new Error('The streets is not array.');
    template.address['street_1'] = streets[0];
    template.address['street_2'] = ( !streets[1] )? '':streets[1];
    template.address['city'] = city;
    template.address['state'] = state;
    template.address['postal_code'] = postalCode;
    template.address['country'] = currency;
    return that;
  }

  this.getAddress = function() {
    if ( !template.address ) return null;
    var streets = [template.address.street_1];
    if ( template.address.street_2 != null ) streets.push(template.address.street_2);
    return {
      getStreets: function() { return streets; },
      getCity: function() { return template.address.city; },
      getState: function() { return template.address.state; },
      getPostalCode: function() { return template.address.postal_code; },
      getCountry: function() { return template.address.country; }
    };
  }

  this.addAdjustment = function(name, amount) {
    if ( !template['adjustments'] ) template['adjustments'] = [];
    template.adjustments.push({
      name: name,
      amount: amount
    });
    return that;
  }

  this.getAdjustments = function() {
    if ( !template.adjustments ) return [];
    return template.adjustments.map(function(adjustment, i) {
      return {
        getName: function() { return adjustment.name; },
        getAmount: function() { return adjustment.amount; }
      };
    }, []);
  }

  this.buildTemplate = function() {
    return template;
  }
}

module.exports = ReceiptTemplate;
