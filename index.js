var BotClient = require('./lib/botmessenger/botclient');
var BotMessenger = require('./lib/botmessenger');

var BaseEvent = require('./lib/botmessenger/event/base.event');
var Message = require('./lib/botmessenger/message');
var Template = require('./lib/botmessenger/message/template');
var MessageButton = require('./lib/botmessenger/button');

module.exports = {
  create: function(options, server) {
    if ( !options || !options['pageID'] || !options['appID'] || !options['appSecret'] || !options['validationToken'] || !options['pageToken'] ) throw new Error('Invalid parameter');

    var client = new BotClient(options['pageToken']);
    var bot = new BotMessenger(client, options['appSecret'], options);
    if ( server != null ) bot.attach(server);
    return bot;
  },
  createClient: BotClient,
  createBot: BotMessenger,

  // message builder
  TextMessageBuilder: require('./lib/botmessenger/message/text.message'),
  AttachmentMessageBuilder: require('./lib/botmessenger/message/attachment.message'),
  ImageAttachmentBuilder: require('./lib/botmessenger/message/media/image.attachment'),
  AudioAttachmentBuilder: require('./lib/botmessenger/message/media/audio.attachment'),
  VideoAttachmentBuilder: require('./lib/botmessenger/message/media/video.attachment'),
  FileAttachmentBuilder: require('./lib/botmessenger/message/media/file.attachment'),
  QuickRepliesMessageBuilder: require('./lib/botmessenger/message/quick.replies.message'),

  // template builder
  GenericTemplateBuilder: require('./lib/botmessenger/message/template/generic.template'),
  GenericElementTemplateBuilder: require('./lib/botmessenger/message/template/generic.element.template'),
  ButtonTemplateBuilder: require('./lib/botmessenger/message/template/button.template'),
  ReceiptTemplateBuilder: require('./lib/botmessenger/message/template/receipt.template'),
  ListTemplateBuilder: require('./lib/botmessenger/message/template/list.template'),
  ListElementTemplateBuilder: require('./lib/botmessenger/message/template/list.element.template'),

  // message buttons
  URLButtonBuilder: require('./lib/botmessenger/button/url.button'),
  PostbackButtonBuilder: require('./lib/botmessenger/button/postback.button'),
  ShareButtonBuilder: require('./lib/botmessenger/button/share.button'),
  CallButtonBuilder: require('./lib/botmessenger/button/call.button'),
  BuyButtonBuilder: require('./lib/botmessenger/button/buy.button'),
  AccountLinkButtonBuilder: require('./lib/botmessenger/button/account.link.button'),
  AccountUnlinkButtonBuilder: require('./lib/botmessenger/button/account.unlink.button'),

  // constant
  Events: BaseEvent.TYPE,
  Attachments: Message.ATTACHMENT_TYPE,
  Actions: Message.ACTION,
  Template: Template.TYPE,
  MessageButtons: MessageButton.TYPE,
  Payment: MessageButton.PAYMENT_TYPE,
  WebviewHeight: MessageButton.HEIGHT_RATIO
};
