function generateRandomString(num) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let str = '';
  for (let i = 0; i < num; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

function sendMail(obj) {
  const api_key = '';
  const domain = 'sandbox2d3ff9f87e114f8692c8bc1a7e404057.mailgun.org';
  const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

  const data = {
    from: obj.email,
    to: obj.emails,
    subject: 'Testing Decision Maker',
    text: `${obj.question}`
  };

  mailgun.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
    }
    console.log(body);
  });
}

module.exports = { generateRandomString, sendMail };
