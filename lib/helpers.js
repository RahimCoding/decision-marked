const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const host = process.env.DOMAIN_HOST;
const port = process.env.PORT;
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

//--------------url generator---------------//
function generateRandomString(num) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let str = '';
  for (let i = 0; i < num; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

//------------ mailing functions -----------//
function sendMail(obj) {

  const data = {
    from: obj.email,
    to: obj.email,
    subject: `${obj.question}`,
    text: `Hello,
      You just created the poll "${obj.question}"

      The administration link to view results:
      ${host}/poll/${obj.url_id}/result`
  };

  mailgun.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
    }
    console.log(body);
  });
}

function sendPoll(obj) {

  obj.receivers.forEach(element => {
    const data = {
      from: obj.email,
      to: element,
      subject: `${obj.question}`,
      text: `Hello,
      Your friend just created the poll "${obj.question}"

      Go here to vote:
      ${host}/poll/${obj.url_id}/`
    };

    mailgun.messages().send(data, function (error, body) {
      if (error) {
        console.log(error);
      }
      console.log(body);
    });
  });
}

function sendNotification(obj) {

  const data = {
    from: obj.email,
    to: obj.email,
    subject: `${obj.question}`,
    text: `Hello,
        Someone voted your poll "${obj.question}"

        The administration link to view results:
        ${host}:${port}/poll/${obj.url_id}/result`
  };

  mailgun.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
    }
    console.log(body);
  });
}

module.exports = { generateRandomString, sendMail, sendPoll, sendNotification };
