'use strict';
var chai = require('chai');
var should = chai.should();
var BotMessenger = require('../');
var request = require('request');

describe('FacebookServerReqestWebhook', function() {
    var options = {
        pageID: '12345678',
        appID: '1234567890',
        appSecret: 'testsecret',
        validationToken: 'testvalidationtoken',
        pageToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9/eyJzdWIiOiIyMDAiLCJpc3MiOiJodHRwOlwvXC9lZGNtcy5tb25vaW5mb3N5c3RlbXMuY29tXC9hcGlcL3YxXC9hdXRoXC9sb2dpbiIsImlhdCI6MTQ3NTAzMDc5MiwiZXhwIjoxNDc1MDM0MzkyLCJuYmYiOjE0NzUwMzA3OTIsImp0aSI6IjNkMTlkZjRhOTQ4YzgxNjU2ZTUzMzZlZjVmY2E2YWIwIn0/Fdmehk8h50Aeg5k8yHG9vsNJXvVQGQI5rdpz0rndge8'
    };

    var bot = BotMessenger.create(options);
    bot.webhook('/webhook');
    bot.on(BotMessenger.Events.MESSAGE, function(senderId, message) {
        senderId.should.equal('USER_ID');
        message.getTimestamp().should.equal(1458692752478);
        message.isQuickReply().should.be.true;
        message.getMessageId().should.equal('mid.1457764197618:41d102a3e1ae206a38');
        message.getMessageSeq().should.equal(73);
        message.getText().should.equal('hello, world!');
        message.getData().should.equal('DEVELOPER_DEFINED_PAYLOAD');
    });

    before(function() {
        bot.listen(8000);
    });

    after(function() {
        bot.close();
    });

    it('should return 200', function(done) {
        var requestJsonData = {
            "object": "page",
            "entry": [{
                "id": "PAGE_ID",
                "time": 1458692752478,
                "messaging": [{
                    "sender": {
                        "id": "USER_ID"
                    },
                    "recipient": {
                        "id": "PAGE_ID"
                    },
                    "timestamp": 1458692752478,
                    "message": {
                        "mid": "mid.1457764197618:41d102a3e1ae206a38",
                        "seq": 73,
                        "text": "hello, world!",
                        "quick_reply": {
                            "payload": "DEVELOPER_DEFINED_PAYLOAD"
                        }
                    }
                }]
            }]
        };
        var signature = 'abc=03f255962d18bb7df078a67ba7ded3852f9d0d61';

        request({
            method: 'POST',
            url: 'http://localhost:8000/webhook',
            headers: {
                'Content-Type': 'application/json',
                'x-hub-signature': signature
            },
            body: JSON.stringify(requestJsonData)
        }, function(error, response, body) {
            response.statusCode.should.equal(200);
            done();
        });
    });
});