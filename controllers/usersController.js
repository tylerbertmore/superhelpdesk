const express = require('express');
const router = express.Router();
const db = require('../models');

// routes begin with /users
router.get('/:userid', isLoggedIn, (req, res) => {
  db.User.findById(req.params.userid, (err, foundUser) => {
    if(err) return console.log(err);
    db.Ticket.find({tech: foundUser}, (err, foundTickets) => {
      if(err) return console.log(err);
      res.render('users/show', {user: foundUser, tickets: foundTickets})
    })
  })
})


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  req.flash('error', 'You must sign in first');
  res.redirect('/login');
}

module.exports = router