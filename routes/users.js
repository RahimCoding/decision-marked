/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('users');
});

router.post('/poll', (req, res) => {
  console.log(req.body)
  const api_key = '';
  const domain = 'sandbox2d3ff9f87e114f8692c8bc1a7e404057.mailgun.org';
  const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

  const data = {
    from: req.body.email,
    to: req.body.emails,
    subject: 'Testing Decision Maker',
    text: `${req.body.question}`
  };

  mailgun.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
    }
    console.log(body);
  });
})
module.exports = router;
