var BaseEvent = require("./base.event");

AppRolesEvent.prototype = new BaseEvent();
AppRolesEvent.prototype.constructor = AppRolesEvent;

function AppRolesEvent(pageId, timeOfEvent, event) {
  BaseEvent.apply(this, arguments);
  var that = this;
  this.setType(BaseEvent.TYPE.APP_ROLES);

  this.getUserRef = function () {
    if (!that.getSenderId()) return null;
    return event.sender.id;
  };

  this.getAppRoles = function () {
    return event.app_roles[pageId];
  };
}

module.exports = AppRolesEvent;
