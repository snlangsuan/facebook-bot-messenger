# facebook-bot-messenger

==

[![npm version](https://badge.fury.io/js/facebook-bot-messenger.svg)](https://badge.fury.io/js/facebook-bot-messenger)
[![Build Status](https://travis-ci.org/snlangsuan/facebook-bot-messenger.svg?branch=master)](https://travis-ci.org/snlangsuan/facebook-bot-messenger)

SDK of the Facebook Messenger Platform for Node.js

Installation
--

The Facebook Messenger Platform SDK can be installed with [NPM](https://www.npmjs.com).

```
$ npm install facebook-bot-messenger
```

Getting started
--

### Require the SDK
```js
var MessengerPlatform = require('facebook-bot-messenger');
```

### Create bot server with bot client instance (support on v.1.1.x)
sample is following
```js
var bot = MessengerPlatform.create({
  pageID: '<your page id>',
  appID: '<your app id>',
  appSecret: '<your app secret>',
  validationToken: '<your validation token>',
  pageToken: '<your page token>'
});
bot.webhook('/webhook');
bot.on(MessengerPlatform.Events.MESSAGE, function(userId, message) {
  // add code below.
});
bot.listen(8080);
```

#### Using with Node http server
```js
var server = require('http').createServer(handler);
var bot = MessengerPlatform.create({
  pageID: '<your page id>',
  appID: '<your app id>',
  appSecret: '<your app secret>',
  validationToken: '<your validation token>',
  pageToken: '<your page token>'
}, server);
bot.webhook('/webhook');
bot.on(MessengerPlatform.Events.MESSAGE, function(userId, message) {
  // add code below.
});
server.listen(8080);
```

#### Using with Express 3/4
```js
var app = require('express')();
var server = require('http').Server(app);
var bot = MessengerPlatform.create({
  pageID: '<your page id>',
  appID: '<your app id>',
  appSecret: '<your app secret>',
  validationToken: '<your validation token>',
  pageToken: '<your page token>'
}, server);
app.use(bot.webhook('/webhook'));
bot.on(MessengerPlatform.Events.MESSAGE, function(userId, message) {
  // add code below.
});
server.listen(8080);
```

### Create the bot client instance
Instance of bot client is a handler of the Messenger Platform.

```js
var bot = MessengerPlatform.create({
  pageID: '<your page id>',
  appID: '<your app id>',
  appSecret: '<your app secret>',
  validationToken: '<your validation token>',
  pageToken: '<your page token>'
});
```

### Call API

You can call API through the bot client instance.

#### Get profile
Get detail information of user.

```js
bot.getProfile('<user id>').then(function(data) {
  // add your code when success.
}).catch(function(error) {
  // add your code when error.
});
```

When MessengerPlatform#getProfile() success return JSON object.

#### Send action

Send readed message
```js
bot.sendReadedAction('<user id>');
```

Send typing on
```js
bot.sendTypingAction('<user id>');
```

Send typing off
```js
bot.sendClearTypingAction('<user id>');
```

#### Send message
sample is following

```js
bot.sendTextMessage('<user id>', '<message>');
```

This procedure sends a message to the destination that is associated with <user id>.

More advanced sample is below;

```js
var textMessageBuilder = new MessengerPlatform.TextMessageBuilder('<message>');
bot.sendMessage('<user id>', textMessageBuilder);
```

And other send method;

Send image attachment message
```js
bot.sendImageMessage('<user id>', '<url>', '<is reusable');
```

Send audio attachment message
```js
bot.sendAudioMessage('<user id>', '<url>', '<is reusable');
```

Send video attachment message
```js
bot.sendVideoMessage('<user id>', '<url>', '<is reusable');
```

Send file attachment message
```js
bot.sendFileMessage('<user id>', '<url>', '<is reusable');
```

#### Message builder
Type of message depends on the type of instance of MessageBuilder. That means this method sends text message if you pass TextMessageBuilder

The type of instance of MessageBuilder

TextMessageBuilder
```js
var builder = new MessengerPlatform.TextMessageBuilder('<message>');
```

QuickRepliesMessageBuilder
```js
var builder = new MessengerPlatform.QuickRepliesMessageBuilder('Pick a color:');
builder.addImageOption('Red', 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED', 'http://petersfantastichats.com/img/red.png')
       .addImageOption('Green', 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN', 'http://petersfantastichats.com/img/green.png');
```

AttachmentMessageBuilder
```js
var builder = new MessengerPlatform.AttachmentMessageBuilder();
builder.addImageAttachment('<url>', '<is reusable>');
```

Template attachment message:

- Generic

```js
var element = new MessengerPlatform.GenericElementTemplateBuilder('Welcome to Peter\'s Hats', 'https://petersfancybrownhats.com', 'https://petersfancybrownhats.com/company_image.png', 'We\'ve got the right hat for everyone.');
element1.addButton(new MessengerPlatform.URLButtonBuilder('View Website', 'https://petersfancybrownhats.com'));
var template = new MessengerPlatform.GenericTemplateBuilder();
template.addElement(element);
var builder = new MessengerPlatform.AttachmentMessageBuilder(template);
```

- Button

```js
var btnUrl = new MessengerPlatform.URLButtonBuilder('Show Website', 'https://petersapparel.parseapp.com');
var btnPostback = new MessengerPlatform.PostbackButtonBuilder('Start Chatting', 'DEVELOPER_DEFINED_PAYLOAD');
var template = new MessengerPlatform.ButtonTemplateBuilder('What do you want to do next?', [btnUrl, btnPostback]);
var builder = new MessengerPlatform.AttachmentMessageBuilder(template);
```

- List

```js
var element1 = new MessengerPlatform.ListElementTemplateBuilder('Classic Black T-Shirt', 'https://peterssendreceiveapp.ngrok.io/img/black-t-shirt.png', '100% Cotton, 200% Comfortable');
element1.setDefaultAction('https://peterssendreceiveapp.ngrok.io/view?item=102', 'https://peterssendreceiveapp.ngrok.io/', true, MessengerPlatform.WebviewHeight.TALL)
        .addURLButton('Buy', 'https://peterssendreceiveapp.ngrok.io/view?item=102');

var element2 = new MessengerPlatform.ListElementTemplateBuilder('Classic Gray T-Shirt', 'https://peterssendreceiveapp.ngrok.io/img/gray-t-shirt.png', '100% Cotton, 200% Comfortable');
element2.setDefaultAction('https://peterssendreceiveapp.ngrok.io/view?item=103', 'https://peterssendreceiveapp.ngrok.io/', true, MessengerPlatform.WebviewHeight.TALL)
        .addURLButton('Buy', 'https://peterssendreceiveapp.ngrok.io/shop?item=103');
var template = new MessengerPlatform.ListTemplateBuilder();
template.isLargeTopElement(true)
        .addElement(element1)
        .addElement(element2)
        .addPostbackButton('View More', 'USER_DEFINED_PAYLOAD');
var builder = new MessengerPlatform.AttachmentMessageBuilder(template);
```

- Receipt

```js
var template = new MessengerPlatform.ReceiptTemplateBuilder('Stephane Crozatier', '12345678902', 'USD', 'Visa 2345');
template.setOrderUrl('http://petersapparel.parseapp.com/order?order_id=123456')
        .setTimestamp('1428444852')
        .addElement('Classic White T-Shirt', 50, 'http://petersapparel.parseapp.com/img/whiteshirt.png', 2, '100% Soft and Luxurious Cotton', 'USD')
        .addElement('Classic Gray T-Shirt', 25, 'http://petersapparel.parseapp.com/img/grayshirt.png', 1, '100% Soft and Luxurious Cotton', 'USD')
        .setAddress(['1 Hacker Way'], 'Menlo Park', 'CA', '94025', 'US')
        .setSummary('56.14', '75.00', '4.95', '6.19')
        .addAdjustment('New Customer Discount', 20)
        .addAdjustment('$10 Off Coupon', 10);
var builder = new MessengerPlatform.AttachmentMessageBuilder(template);
```
#### Webhook
Facebook's server sends user action (message, message delivered, message read and etc.) to your bot server. Request of that contains event(s); event is action of the user.

Webhook events:
- **MESSAGE** Event name will occur when a message has been sent to your page. You may receive text messages or messages with attachments.
- **MESSAGE_DELIVERED** Event name will occur when a message a page has sent has been delivered.
- **MESSAGE_READ** Event name will occur when a message a page has sent has been read by the user.
- **MESSAGE_ECHO** Event name will occur when a message has been sent by your page. You may receive text messsages or messages with attachments.
- **POSTBACK** Event name will occur when a Postback button, Get Started button, Persistent menu or Structured Message is tapped.
- **OPTIN** Event name will occur when the Send-to-Messenger plugin has been tapped.
- **REFERRAL** Event name will occur when an m.me link is used with a referral param and only in a case this user already has a thread with this bot.
- **PAYMENTS** Event name will occurs when a persons taps the pay button from the checkout dialog rendered by the Buy Button.
- **CHECKOUT_UPDATE** Event name enables you to update pricing for flexible-amount transactions on the checkout dialog displayed by the Buy Button.
- **ACCOUNT_LINKING** Event name will occur when the Linked Account or Unlink Account call-to-action have been tapped.

See Also
--

- [Messenger Platform Guides](https://developers.facebook.com/docs/messenger-platform/guides)
- [Messenger Platform Webhook Reference](https://developers.facebook.com/docs/messenger-platform/webhook-reference)
- [Messenger Platform Send API Reference](https://developers.facebook.com/docs/messenger-platform/send-api-reference)
