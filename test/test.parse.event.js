'use strict';
var chai = require('chai');
var should = chai.should();
var BotMessenger = require('../');

describe('ParsingJSONObject', function() {
    let pageToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9/eyJzdWIiOiIyMDAiLCJpc3MiOiJodHRwOlwvXC9lZGNtcy5tb25vaW5mb3N5c3RlbXMuY29tXC9hcGlcL3YxXC9hdXRoXC9sb2dpbiIsImlhdCI6MTQ3NTAzMDc5MiwiZXhwIjoxNDc1MDM0MzkyLCJuYmYiOjE0NzUwMzA3OTIsImp0aSI6IjNkMTlkZjRhOTQ4YzgxNjU2ZTUzMzZlZjVmY2E2YWIwIn0/Fdmehk8h50Aeg5k8yHG9vsNJXvVQGQI5rdpz0rndge8';
    let options = {
        endpointVersion: 'v2.9'
    };

    let client = new BotMessenger.createClient(pageToken);
    let bot = new BotMessenger.createBot(client, options);

    bot.on(BotMessenger.Events.MESSAGE, function(senderId, message) {
        console.log(message);
        senderId.should.equal('USER_ID');
        message.getTimestamp().should.equal(1458692752478);
        message.isQuickReply().should.be.true;
        message.getMessageId().should.equal('mid.1457764197618:41d102a3e1ae206a38');
        message.getMessageSeq().should.equal(73);
        message.getText().should.equal('hello, world!');
        message.getData().should.equal('DEVELOPER_DEFINED_PAYLOAD');
    });

    var body = {
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

    before(function() {
        bot.parse(body);
    });

    it('get message', function(done) {
        done();
    });
})