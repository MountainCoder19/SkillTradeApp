"use strict";

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');
const bodyParser = require('body-parser');

router.get('/skillManager/:id', (req, res, next)=>{
  knex('skill_cards')
    .where('user_id', req.params.id)
    .join('users', 'user_id', 'users.id')
    .then(function(result){
      console.log(result);
      return res.send(result);
    });
});

router.post('/skillManager/:user_id', (req, res, next)=>{
  knex('skill_cards')
    .where('user_id', req.params.user_id)
    .insert(req.body, '*')
    .then(function(result){
      return res.send(result);
    })
    .catch((err)=>{
      return res.status(400).send(err);
    });
});

module.exports = router;
