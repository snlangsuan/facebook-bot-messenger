'use strict';
var chai = require('chai');
// var chaiAsPromised = require('chai-as-promised');
var should = chai.should();
var nock = require('nock');

// chai.use(chaiAsPromised);

var BotMessenger = require('../');

var QuickRepliesMessageBuilder = BotMessenger.QuickRepliesMessageBuilder;
var TemplateMessageBuilder = BotMessenger.TemplateMessageBuilder;

var GenericTemplateBuilder = BotMessenger.GenericTemplateBuilder;
var ButtonTemplateBuilder = BotMessenger.ButtonTemplateBuilder;
var ReceiptTemplateBuilder = BotMessenger.ReceiptTemplateBuilder;

var URLButtonBuilder = BotMessenger.URLButtonBuilder;
var PostbackButtonBuilder = BotMessenger.PostbackButtonBuilder;
var ShareButtonBuilder = BotMessenger.ShareButtonBuilder;
var CallButtonBuilder = BotMessenger.CallButtonBuilder;
var BuyButtonBuilder = BotMessenger.BuyButtonBuilder;

function mockApi() {
  nock('https://graph.facebook.com')
    .post('/v2.8/me/messages')
    .reply(200, {});
}

describe('BotMessenger#sendMessage', function() {
  var options = {
    pageID: '12345678',
    appID: '1234567890',
    appSecret: 'testsecret',
    validationToken: 'testvalidationtoken',
    pageToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9/eyJzdWIiOiIyMDAiLCJpc3MiOiJodHRwOlwvXC9lZGNtcy5tb25vaW5mb3N5c3RlbXMuY29tXC9hcGlcL3YxXC9hdXRoXC9sb2dpbiIsImlhdCI6MTQ3NTAzMDc5MiwiZXhwIjoxNDc1MDM0MzkyLCJuYmYiOjE0NzUwMzA3OTIsImp0aSI6IjNkMTlkZjRhOTQ4YzgxNjU2ZTUzMzZlZjVmY2E2YWIwIn0/Fdmehk8h50Aeg5k8yHG9vsNJXvVQGQI5rdpz0rndge8'
  };

  var bot = BotMessenger.create(options);

  beforeEach(function() {
    mockApi();
  });

  it('should be able to send text message', function(done) {
    bot.sendTextMessage('DUMMY_USER_ID', 'hello!').then(function() {
      done();
    });
  });

  it('should be able to send image message', function(done) {
    bot.sendImageMessage('DUMMY_USER_ID', 'https://example.com/original.jpg').then(function() {
      done();
    });
  });

  it('should be able to send video message', function(done) {
    bot.sendVideoMessage('DUMMY_USER_ID', 'https://example.com/original.mp4').then(function() {
      done();
    });
  });

  it('should be able to send audio message', function(done) {
    bot.sendAudioMessage('DUMMY_USER_ID', 'https://example.com/original.mp3').then(function() {
      done();
    });
  });

  it('should be able to send file message', function(done) {
    bot.sendFileMessage('DUMMY_USER_ID', 'https://example.com/file.pdf').then(function() {
      done();
    });
  });

  it('should be able to send quick replies message', function(done) {
    var message = new QuickRepliesMessageBuilder('Pick a color:');
    message.addImageOption('Red', 'http://petersfantastichats.com/img/red.png', 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED')
           .addImageOption('Green', 'http://petersfantastichats.com/img/green.png', 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN');
    bot.sendMessage('DUMMY_USER_ID', message).then(function() {
      done();
    });
  });

  it('should be able to send generic template message', function(done) {
    var template = new GenericTemplateBuilder('Welcome to Peter\'s Hats');
    template.setSubTitle('We\'ve got the right hat for everyone.')
           .setLink('https://petersfancybrownhats.com')
           .setThumbnailImageUrl('https://petersfancybrownhats.com/company_image.png')
           .addMessageButton(new URLButtonBuilder('View Website', 'https://petersfancybrownhats.com'))
           .addMessageButton(new PostbackButtonBuilder('Start Chatting', 'DEVELOPER_DEFINED_PAYLOAD'));
    var message = new TemplateMessageBuilder(template);
    bot.sendMessage('DUMMY_USER_ID', message).then(function() {
      done();
    });
  });

  it('should be able to send button template message', function(done) {
    var buttons = [
      new URLButtonBuilder('Show Website', 'https://petersapparel.parseapp.com'),
      new PostbackButtonBuilder('Start Chatting', 'USER_DEFINED_PAYLOAD')
    ];

    var template = new ButtonTemplateBuilder('What do you want to do next?', buttons);
    var message = new TemplateMessageBuilder(template);
    bot.sendMessage('DUMMY_USER_ID', message).then(function() {
      done();
    });
  });

  it('should be able to send receipt template message', function(done) {
    var template = new ReceiptTemplateBuilder('Stephane Crozatier', '12345678902', 'USD', 'Visa 2345', 'http://petersapparel.parseapp.com/order?order_id=123456', '1428444852');
    template.setAddress('1 Hacker Way', 'Menlo Park', '94025', 'CA', 'US')
            .addPurchaseList('Classic White T-Shirt', 50, '100% Soft and Luxurious Cotton', 2, 'http://petersapparel.parseapp.com/img/whiteshirt.png')
            .addPurchaseList('Classic Gray T-Shirt', 25, '100% Soft and Luxurious Cotton', 1, 'http://petersapparel.parseapp.com/img/grayshirt.png')
            .setSummary(56.14, 75.00, 4.95, 6.19)
            .addAdjustments('New Customer Discount', 20)
            .addAdjustments('$10 Off Coupon', 10);
    var message = new TemplateMessageBuilder(template);
    bot.sendMessage('DUMMY_USER_ID', message).then(function() {
      done();
    });
  });
});
