var Template = require('../template');

ReceiptTemplate.prototype = new Template();
ReceiptTemplate.prototype.constructor = ReceiptTemplate;

function ReceiptTemplate(name, orderId, currency, paymentMethod, orderUrl, timestamp) {
  var that = this;
  var elements = [];
  var address = {};
  var summary = {};
  var adjustments = [];

  this.setName = function(str) {
    name = str;
    return that;
  }

  this.getName = function() {
    return name;
  }

  this.setOrderNumber = function(id) {
    orderId = id;
    return that;
  }

  this.getOrderNumber = function() {
    return orderId;
  }

  this.setCurrency = function(str) {
    currency = str;
    return that;
  }

  this.getCurrency = function() {
    return currency;
  }

  this.setPaymentMethod = function(method) {
    paymentMethod = method;
    return that;
  }

  this.getPaymentMethod = function() {
    return paymentMethod;
  }

  this.setOrderUrl = function(url) {
    orderUrl = url;
    return that;
  }

  this.getOrderUrl = function() {
    return orderUrl;
  }

  this.setTimestamp = function(ts) {
    timestamp = ts;
    return that;
  }

  this.getTimestamp = function() {
    return timestamp;
  }

  this.addPurchaseList = function(title, price, subtitle, quantity, thumbnailUrl) {
    var element = {
      title: title,
      price: parseInt(price),
      currency: currency
    };
    if ( subtitle ) element.subtitle = subtitle;
    if ( quantity && parseInt(quantity) > 0 ) element.quantity = parseInt(quantity);
    if ( thumbnailUrl ) element.image_url = thumbnailUrl;
    elements.push(element);
    return that;
  }

  this.setAddress = function(street1, city, postalCode, state, country, street2) {
    address.street_1 = street1;
    address.city = city;
    address.postal_code = postalCode;
    address.state = state;
    address.country = country;
    if ( street2 ) address.street_2 = street2;
    return that;
  }

  this.getAddress = function() {
    return address;
  }

  this.setSummary = function(totalCost, subtotal, shippingCost, totalTax) {
    summary.total_cost = totalCost;
    if ( subtotal ) summary.subtotal = subtotal;
    if ( shippingCost ) summary.shipping_cost = shippingCost;
    if ( totalTax ) summary.total_text = totalTax;
    return that;
  }

  this.getSummary = function() {
    return summary;
  }

  this.addAdjustments = function(adjustmentsName, adjustmentsAmount) {
    adjustments.push({
      name: adjustmentsName,
      amount: adjustmentsAmount
    });
    return that;
  }

  this.buildTemplate = function() {
    var template = {
      template_type: Template.TYPE.RECEIPT,
      recipient_name: name,
      order_number: orderId,
      currency: currency,
      payment_method: paymentMethod,
      summary: summary
    };

    if ( timestamp ) template.timestamp = timestamp;
    if ( orderUrl ) template.order_url = orderUrl;
    if ( elements.length > 0 ) template.elements = elements;
    if ( Object.keys(address).length > 0 ) template.address = address;
    if ( adjustments.length > 0 ) template.adjustments = adjustments;
    return template;
  }
}

module.exports = ReceiptTemplate;
