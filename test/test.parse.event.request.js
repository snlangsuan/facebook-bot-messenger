'use strict';
var chai = require('chai');
var should = chai.should();

var Event = require('../lib/botmessenger/event');
var QuickReplyMessageEvent = require('../lib/botmessenger/event/message/quick.reply.message');
var AttachmentMessageEvent = require('../lib/botmessenger/event/message/attachments.message');
var PostbackEvent = require('../lib/botmessenger/event/postback.event');
var Signature = require('../lib/botmessenger/signature.validator');

describe('ParseEventRequest', function() {
  it('should be able to create receives from json (text message event)', function(done) {
    var options = {
      pageID: '12345678',
      appID: '1234567890',
      appSecret: 'testsecret'
    };

    var requestJsonData = {"object":"page","entry":[{"id":"PAGE_ID","time":1458692752478,"messaging":[{"sender":{"id":"USER_ID"},"recipient":{"id":"PAGE_ID"},"timestamp":1458692752478,"message":{"mid":"mid.1457764197618:41d102a3e1ae206a38","seq":73,"text":"hello, world!","quick_reply": {"payload": "DEVELOPER_DEFINED_PAYLOAD"}}}]}]};

    var signature = 'abc=03f255962d18bb7df078a67ba7ded3852f9d0d61';

    var receives = Event.parseEventRequest(requestJsonData, options.appSecret, signature);

    receives.should.be.an.instanceof(Array).that.has.lengthOf(1);

    receives[0].should.be.an.instanceof(QuickReplyMessageEvent);
    receives[0].getType().should.equal('message');
    receives[0].getUserId().should.equal('USER_ID');
    receives[0].getSenderId().should.equal('USER_ID');
    receives[0].getRecipientId().should.equal('PAGE_ID');
    receives[0].getTimestamp().should.equal(1458692752478);
    receives[0].isTextMessage().should.be.false;
    receives[0].isQuickReply().should.be.true;
    receives[0].hasAttachments().should.be.false;
    receives[0].getMessageId().should.equal('mid.1457764197618:41d102a3e1ae206a38');
    receives[0].getMessageSeq().should.equal(73);
    receives[0].getText().should.equal('hello, world!');
    receives[0].getData().should.equal('DEVELOPER_DEFINED_PAYLOAD');
    done();
  });

  it('should be able to create receives from json (message image attachment event)', function(done) {
    var options = {
      pageID: '12345678',
      appID: '1234567890',
      appSecret: 'testsecret'
    };

    var requestJsonData = {"object":"page","entry":[{"id":"PAGE_ID","time":1458692752478,"messaging":[{"sender":{"id":"USER_ID"},"recipient":{"id":"PAGE_ID"},"timestamp":1458692752478,"message":{"mid":"mid.1458696618141:b4ef9d19ec21086067","seq":51,"attachments":[{"type":"image","payload":{"url":"IMAGE_URL"}}]}}]}]};

    var signature = 'abc=6907cfb0baf7b5da50720a23221b4d7f6bd85100';

    var receives = Event.parseEventRequest(requestJsonData, options.appSecret, signature);

    receives.should.be.an.instanceof(Array).that.has.lengthOf(1);

    receives[0].should.be.an.instanceof(AttachmentMessageEvent);
    receives[0].getType().should.equal('message');
    receives[0].getUserId().should.equal('USER_ID');
    receives[0].getSenderId().should.equal('USER_ID');
    receives[0].getRecipientId().should.equal('PAGE_ID');
    receives[0].getTimestamp().should.equal(1458692752478);
    receives[0].isTextMessage().should.be.false;
    receives[0].isQuickReply().should.be.false;
    receives[0].hasAttachments().should.be.true;
    receives[0].getMessageId().should.equal('mid.1458696618141:b4ef9d19ec21086067');
    receives[0].getMessageSeq().should.equal(51);
    var attachments = receives[0].getAttachments();
    attachments.should.be.an.instanceof(Array).that.has.lengthOf(1);
    attachments[0].getType().should.equal('image');
    attachments[0].getContent().should.equal('IMAGE_URL');
    done();
  });

  it('should be able to create receives from json (postback event)', function(done) {
    var options = {
      pageID: '12345678',
      appID: '1234567890',
      appSecret: 'testsecret'
    };

    var requestJsonData = {"object":"page","entry":[{"id":"PAGE_ID","time":1458692752478,"messaging":[{"sender":{"id":"USER_ID"},"recipient":{"id":"PAGE_ID"},"timestamp":1458692752478,"postback":{"payload":"USER_DEFINED_PAYLOAD"}}]}]};

    // var signature = 'abc=9214dbdcce60d0655eb38277b2311aa798ca37da';
    var signature = Signature.createSignature(requestJsonData, options.appSecret);

    var receives = Event.parseEventRequest(requestJsonData, options.appSecret, signature);

    receives.should.be.an.instanceof(Array).that.has.lengthOf(1);

    receives[0].should.be.an.instanceof(PostbackEvent);
    receives[0].getType().should.equal('postback');
    receives[0].getSenderId().should.equal('USER_ID');
    receives[0].getRecipientId().should.equal('PAGE_ID');
    receives[0].getTimestamp().should.equal(1458692752478);
    receives[0].getPostbackData().should.equal('USER_DEFINED_PAYLOAD');
    done();
  });
});
