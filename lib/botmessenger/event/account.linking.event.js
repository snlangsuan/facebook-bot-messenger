var BaseEvent = require('./base.event');

AccountLinkingEvent.prototype = new BaseEvent();
AccountLinkingEvent.prototype.constructor = AccountLinkingEvent;

function AccountLinkingEvent() {
  BaseEvent.apply(this, arguments);
  if ( arguments.length < 1 ) return;
  var event = arguments[2];
  BaseEvent.prototype.type = BaseEvent.TYPE.ACCOUNT_LINKING;

  this.isLinked = function() {
    return (event.account_linking.status == 'linked');
  }

  this.isUnLinked = function() {
    return (event.account_linking.status === 'unlinked');
  }

  this.getAuthorizationCode = function() {
    return ( !(code = event.account_linking.authorization_code) )? null: code;
  }
}

module.exports = AccountLinkingEvent;
