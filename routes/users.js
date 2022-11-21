/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { sendMail, generateRandomString } = require('../lib/helpers.js')
const router  = express.Router();
const poll = {
      id: 'sedrg4b',
      email: 'tbekishev@gmail.com',
      question: 'What movie are we watching this Friday?',
      options: ['Matrix 7', 'Interstellar 3', 'Die Hard 10'],
      receivers: ['rahimj2196@gmail.com']
      }

router.get('/', (req, res) => {
  res.render('users');
});

router.post('/poll', (req, res) => {
  const options = [];
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);

  keys.forEach((element, index) => {
    if (element.includes('opti')) {
      options.push(values[index]);
    }
  });

  const receivers = req.body.receivers.split(/,\s*/g);

  const newPoll = {
    url_id: generateRandomString(12),
    email: req.body.email,
    question: req.body.question,
    options,
    receivers
  }
  console.log(newPoll)

  res.redirect(`/poll/${poll.id}/result`);
})

router.get("/poll/:id", (req, res) => {
  res.json(poll);
});

router.get("/poll/:id/result", (req, res) => {
  res.json(poll.options, poll.question);
});

module.exports = router;
