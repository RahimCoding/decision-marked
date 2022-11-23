/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { sendMail, generateRandomString } = require('../lib/helpers.js')
const router  = express.Router();
const db = require('../db/connection');
const poll = {
  url_id: 'sedrg4b',
  email: 'tbekishev@gmail.com',
  question: 'What movie are we watching this Friday?',
  options: ['Matrix 7', 'Interstellar 3', 'Die Hard 10'],
  receivers: ['rahimj2196@gmail.com'],
  ranks: [1,1,1]
};
let newPoll = {};

/*router.get('/', (req, res) => {
  res.render('users');
});*/

router.post('/poll', (req, res) => {
  const options = [];
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  console.log("req",req.body);
  keys.forEach((element, index) => {
    if (element.includes('opti')) {
      options.push(values[index]);
    }
  });

  const receivers = req.body.receivers.split(/,\s*/g);

  newPoll = {
    url_id: generateRandomString(12),
    email: req.body.email,
    question: req.body.question,
    options,
    receivers
  };
  console.log("new:" ,newPoll);
  db.query(`INSERT INTO polls (email, question, url, sent_email) VALUES($1,$2,$3,$4) RETURNING *;`, [newPoll.email, newPoll.question, newPoll.url_id, newPoll.receivers]).then(data => {
    let pollId = data.rows[0].id;
    for (let i = 0; i < newPoll.options.length; i++) {
      db.query(`INSERT INTO polls_options (option, ranking, polls_id) VALUES ($1,$2,$3);`, [newPoll.options[i], 0, pollId]);
    }
  });
  res.redirect(`/poll/${newPoll.url_id}/result`);
});

router.get("/poll/:id", (req, res) => {
  const query = `SELECT * FROM polls
                  INNER JOIN polls_options on polls.id = polls_id
                  WHERE url = '${req.params.id}'
                  ORDER BY ranking`;
  db.query(query)
    .then(data => {
      const poll = data.rows;
      res.json({ poll });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get("/poll/:id/result", (req, res) => {
  const query = `SELECT * FROM polls
  INNER JOIN polls_options on polls.id = polls_id
  WHERE url = '${req.params.id}'
  ORDER BY ranking`;
  db.query(query)
    .then(data => {
      const poll = data.rows;
      res.json({ poll });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.put("/poll/:id", (req, res) => {
  console.log(req.body)
  const query = `SELECT polls.id as id, option, ranking
                 FROM polls
                 JOIN polls_options ON polls.id = polls_id
                 WHERE url = '${req.params.id}'`;
  db.query(query)
    .then(data => {
      const poll = data.rows[0].id;
      data.rows.forEach((element, index) => {
        let option = data.rows[index].option ;
        let ranking = data.rows[index].ranking + parseInt(req.body[option]);
        console.log('option: '+ Number.isInteger(data.rows[index].ranking) + ' ranking: ' + Number.isInteger(req.body[option]))
        db.query(`UPDATE polls_options
        SET ranking = $1
        WHERE option = $2 AND
              polls_id = $3;`, [ranking,option,poll]);
      });
      console.log("poll3", poll);
      res.json({ poll });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});




module.exports = router;
