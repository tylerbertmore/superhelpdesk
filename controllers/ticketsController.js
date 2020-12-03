const express = require('express');
const router = express.Router();
const db = require('../models');

// routes begin with /tickets

router.get('/', isLoggedIn,  (req, res) => {
  db.Ticket.find({}, (err, allTickets) => {
    err ? console.log(err) : res.render('dashboard/dashboard', {allTickets: allTickets})
  }).sort({createdAt: -1})
  
});
// New Ticket Get
router.get('/new', isLoggedIn, (req, res) => {
  res.render('dashboard/newTicket')
});
//New Ticket POST
router.post('/new', isLoggedIn, (req, res) => {
  db.Ticket.create({description: req.body.description, department: req.body.department, requestedBy: req.body.requestedBy, tech: null}, (err, newTicket) =>{
    if(err){
      console.log(err)
    }
    console.log(newTicket)
  })
  req.flash('success', 'Ticket Created Successfully');
  res.redirect('/tickets')
});


router.get('/:ticketId/edit', isLoggedIn, (req, res) => {
  res.render('dashboard/editTicket')
});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  req.flash('error', 'You must sign in first');
  res.redirect('/login');
}

module.exports = router