'use strict';
var chai = require('chai');
// var chaiAsPromised = require('chai-as-promised');
var should = chai.should();
var nock = require('nock');

// chai.use(chaiAsPromised);

var BotMessenger = require('../');

var QuickRepliesMessageBuilder = BotMessenger.QuickRepliesMessageBuilder;
var AttachmentMessageBuilder = BotMessenger.AttachmentMessageBuilder;

var GenericTemplateBuilder = BotMessenger.GenericTemplateBuilder;
var GenericElementTemplateBuilder = BotMessenger.GenericElementTemplateBuilder;
var ButtonTemplateBuilder = BotMessenger.ButtonTemplateBuilder;
var ReceiptTemplateBuilder = BotMessenger.ReceiptTemplateBuilder;

var URLButtonBuilder = BotMessenger.URLButtonBuilder;
var PostbackButtonBuilder = BotMessenger.PostbackButtonBuilder;
var ShareButtonBuilder = BotMessenger.ShareButtonBuilder;
var CallButtonBuilder = BotMessenger.CallButtonBuilder;
var BuyButtonBuilder = BotMessenger.BuyButtonBuilder;

var options = {
  pageID: '12345678',
  appID: '1234567890',
  appSecret: 'testsecret',
  validationToken: 'testvalidationtoken',
  pageToken: 'pagetoken'
};

function mockApi() {
  var path = '/v2.8/me/messages?access_token=' + encodeURIComponent(options.pageToken);
  nock('https://graph.facebook.com')
    .post(path)
    .reply(200, {});
}

describe('BotMessenger#sendMessage', function() {
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
    var buybutton = new BuyButtonBuilder('buy', 'DEVELOPER_DEFINED_PAYLOAD');
    buybutton.setCurrency('THB')
             .setPaymentType(BuyButtonBuilder.PAYMENT_TYPE.FIXED)
             .isTestPayment(true)
             .setMerchantName('Peter\'s Apparel')
             .requestedShippingAddress()
             .requestedContactName()
             .requestedContactPhone()
             .requestedContactEmail()
             .addPriceList('Subtotal', '29.99')
             .addPriceList('Taxes', '2.47');
    var element1 = new GenericElementTemplateBuilder('Welcome to Peter\'s Hats1', 'https://petersfancybrownhats.com/1', 'https://petersfancybrownhats.com/company_image1.png', 'We\'ve got the right hat for everyone.');
    element1.addButton(new ShareButtonBuilder());
    var element2 = new GenericElementTemplateBuilder('Welcome to Peter\'s Hats2', 'https://petersfancybrownhats.com/2', 'https://petersfancybrownhats.com/company_image2.png', 'We\'ve got the right hat for everyone.');
    element2.addButton(buybutton);

    var template = new GenericTemplateBuilder();
    template.addElement(element1)
            .addElement(element2);

    var message = new AttachmentMessageBuilder();
    message.addTemplateAttachment(template);
    bot.sendMessage('DUMMY_USER_ID', message).then(function() {
      done();
    });
  });

  it('should be able to send button template message', function(done) {
    var template = new ButtonTemplateBuilder();
    template.setText('What do you want to do next?')
            .addURLButton('Show Website', 'https://petersapparel.parseapp.com')
            .addPostbackButton('Start Chatting', 'USER_DEFINED_PAYLOAD')
            .addButton(new CallButtonBuilder('Call Representative', '+123123123'));

    var message = new AttachmentMessageBuilder();
    message.addTemplateAttachment(template);
    bot.sendMessage('DUMMY_USER_ID', message).then(function() {
      done();
    });
  });

  it('should be able to send receipt template message', function(done) {
    var template = new ReceiptTemplateBuilder('Stephane Crozatier', '12345678902', 'THB', 'Visa 2345');
    template.setSummary('1000')
            .setTimestamp(new Date().getTime());

    var message = new AttachmentMessageBuilder();
    message.addTemplateAttachment(template);
    bot.sendMessage('DUMMY_USER_ID', message).then(function() {
      done();
    });
  });
});
