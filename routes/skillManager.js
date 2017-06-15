"use strict";

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const FB = require('fb');


// router.use((req, res, next)=>{
//   console.log("look at me: ",req.session.length);
//   if (req.session.length == 0){
//     res.redirect('/public/index.html')
//   }
//     next();
// })


//FORM DROPDOWNS (arr of 2arr of objs)====================
router.get('/skillManager', function(req, res, next) {
  //checkLoginState();

  let allArr = [];
  knex('categories')
  .then((data)=>{
    allArr.push(data);
    knex('environment')
      .then((data2)=>{
        allArr.push(data2);
        // res.send(allArr);
        req.responseObj = {};
        req.responseObj.allArr = allArr;
        next();
      })
    })
  });


router.get('/skillManager', (req, res, next)=>{
  console.log(req.session);
  getSkillCards(req.session.userID)
    .then(function(result){
      req.responseObj.skillCards = result;
      console.log(result);
      res.send(req.responseObj);
    });
});

function getSkillCards(userId, cardId){
    let query = knex('skill_cards')
    .select('skill_cards.description', 'skill_cards.id', 'skill_cards.title','skill_cards.contact','skill_cards.photo','environment.type AS env_type', 'categories.type AS cat_type')
    .join('environment', 'environment.id', 'skill_cards.environment_id')
    .join('categories', 'categories.id', 'skill_cards.categories_id')
    .where('user_id', userId)

    if (cardId) {
      query.where('skill_cards.id',cardId)
    }

    return query;
}

router.post('/skillManager', (req, res, next)=>{
  console.log(req.session);
  req.body.user_id = req.session.userID;
  req.body.categories_id = parseInt(req.body.categories_id);
  req.body.environment_id = parseInt(req.body.environment_id);
  knex('skill_cards')
    .insert(req.body)
    .returning('id')
    .then(function(id){
      getSkillCards(req.session.userID,id[0])
      .then(function(result) {
        return res.send(result[0]);
      })
    })
    .catch((err)=>{
      console.log(err);
      return res.status(400).send(err);
    });
});

// router.patch('/skillManager/:skill_card_id', (req,res,next) => {
//   knex('skill_cards')
//     .where('id', req.params.skill_card_id)
//     .update(req.body, '*')
//     .then(function(result){
//       return res.send(result);
//     })
//     .catch((err)=>{
//       return res.status(400).send(err);
//     });
// })

router.delete('/skillManager/:skill_card_id', (req,res,next) => {
  knex('skill_cards')
    .where('id', req.params.skill_card_id)
    .returning('*')
    .del()
    .then(function(result){
      return res.send(result);
    })
    .catch((err)=>{
      return res.status(400).send(err);
    });
})


module.exports = router;
