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
      receivers: 'rahimj2196@gmail.com'
      }

router.get('/', (req, res) => {
  res.render('users');
});

router.post('/poll', (req, res) => {
  console.log(req.body)
  console.log(generateRandomString(10))
  res.json(req.body)
  sendMail(req.body);
})
module.exports = router;
