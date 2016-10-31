var BotClient = require('./lib/botmessenger/botclient');
var BotMessenger = require('./lib/botmessenger');

var BaseEvent = require('./lib/botmessenger/event/base.event');
var Message = require('./lib/botmessenger/message');
var Template = require('./lib/botmessenger/message/template');
var MessageButtons = require('./lib/botmessenger/button');

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
  ImageMessageBuilder: require('./lib/botmessenger/message/image.message'),
  AudioMessageBuilder: require('./lib/botmessenger/message/audio.message'),
  VideoMessageBuilder: require('./lib/botmessenger/message/video.message'),
  FileMessageBuilder: require('./lib/botmessenger/message/file.message'),
  QuickRepliesMessageBuilder: require('./lib/botmessenger/message/quick.replies.message'),
  TemplateMessageBuilder: require('./lib/botmessenger/message/template.message'),

  // template builder
  GenericTemplateBuilder: require('./lib/botmessenger/message/template/generic.template'),
  ButtonTemplateBuilder: require('./lib/botmessenger/message/template/button.template'),
  ReceiptTemplateBuilder: require('./lib/botmessenger/message/template/receipt.template'),

  // message buttons
  URLButtonBuilder: require('./lib/botmessenger/button/url.button'),
  PostbackButtonBuilder: require('./lib/botmessenger/button/postback.button'),
  ShareButtonBuilder: require('./lib/botmessenger/button/share.button'),
  CallButtonBuilder: require('./lib/botmessenger/button/call.button'),
  BuyButtonBuilder: require('./lib/botmessenger/button/buy.button'),

  // constant
  Events: BaseEvent.TYPE,
  Attachment: Message.ATTACHMENT_TYPE,
  Actions: Message.ACTION,
  Template: Template.TYPE,
  MessageButtons: MessageButtons.TYPE,
  Payment: MessageButtons.PAYMENT_TYPE,
  WebviewHeight: MessageButtons.HEIGHT_RATIO
};
