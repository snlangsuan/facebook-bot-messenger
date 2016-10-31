'use strict';
var chai = require('chai');
var should = chai.should();

var SignatureValidator = require('../lib/botmessenger/signature.validator');

describe('SignatureValidator', function() {
  var options = {
    pageID: '12345678',
    appID: '1234567890',
    appSecret: 'testsecret'
  };

  var requestJsonData = {
    "object":"page",
    "entry":[{
        "id":"PAGE_ID",
        "time":1458692752478,
        "messaging":[{
          "sender":{
            "id":"USER_ID"
          },
          "recipient":{
            "id":"PAGE_ID"
          },
          "timestamp":1458692752478,
          "message":{
            "mid":"mid.1457764197618:41d102a3e1ae206a38",
            "seq":73,
            "text":"hello, world!",
            "quick_reply": {
              "payload": "DEVELOPER_DEFINED_PAYLOAD"
            }
          }
        }]
      }]
    };

  var rawJson = JSON.stringify(requestJsonData);
  var signature = 'abc=03f255962d18bb7df078a67ba7ded3852f9d0d61';

  it('should be able to validate signature', function(done) {
    SignatureValidator.validateSignature(rawJson, options.appSecret, signature).should.be.true;
    SignatureValidator.validateSignature(rawJson, options.appSecret, 'XXX').should.be.false;
    done();
  });
});
