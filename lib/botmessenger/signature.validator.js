var crypto = require('crypto');
module.exports = {
  validateSignature: function(body, appSecret, signature) {
    if ( !signature ) throw new Error('Signature must not be empty');

    var elements = signature.split('=');
    var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto.createHmac('sha1', appSecret)
                       .update(body)
                       .digest('hex');
    return ( signatureHash === expectedHash );
  }
};
