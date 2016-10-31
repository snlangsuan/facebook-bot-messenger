var BaseEvent = require('./base.event');

AuthenticationEvent.prototype = new BaseEvent();
AuthenticationEvent.prototype.constructor = AuthenticationEvent;

function AuthenticationEvent() {
  BaseEvent.apply(this, arguments);
  if ( arguments.length < 1 ) return;
  var event = arguments[2];
  BaseEvent.prototype.type = BaseEvent.TYPE.AUTHENTICATION;

  this.getRefData = function() {
    return event.optin.ref;
  }
}

module.exports = AuthenticationEvent;
