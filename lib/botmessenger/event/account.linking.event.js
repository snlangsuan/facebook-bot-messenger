var BaseEvent = require('./base.event');

AccountLinkingEvent.prototype = new BaseEvent();
AccountLinkingEvent.prototype.constructor = AccountLinkingEvent;

function AccountLinkingEvent(pageId, timeOfEvent, event) {
  BaseEvent.apply(this, arguments);
  this.setType(BaseEvent.TYPE.ACCOUNT_LINKING);

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
