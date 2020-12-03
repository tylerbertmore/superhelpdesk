const express = require('express');
const router = express.Router();
const db = require('../models');

// routes begin with /tickets

router.get('/', isLoggedIn,  (req, res) => {
  db.Ticket.find({})
  .populate('tech')
  .sort({'createdAt': -1})
  .exec((err, foundTickets) => {
    if(err) return console.log(err);
    res.render('dashboard/dashboard', {allTickets: foundTickets})
  })
  
  
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

//History get
router.get('/history', (req, res) => {
  db.Ticket.find({status: 'Closed'})
  .populate('tech')
  .sort({'createdAt': -1})
  .exec((err, foundTickets) => {
    if(err) return console.log(err);
    res.render('dashboard/ticketHistory', {allTickets: foundTickets})
  })
})

//Show Ticket GEt
router.get('/:ticketId', (req, res) => {
  db.Ticket.findById(req.params.ticketId, (err, foundTicket) => {
    if(err) return console.log(err)
    res.render('dashboard/showTicket', {ticket: foundTicket})
  })
})


// Edit Ticket Get
router.get('/:ticketId/edit', isLoggedIn, (req, res) => {
  db.Ticket.findById(req.params.ticketId, (err, foundTicket) => {
      if(err) return console.log(err);
      res.render('dashboard/editTicket', {ticket: foundTicket})
  })
})
//Close Ticket put
router.put('/:ticketId/close', isLoggedIn, (req, res) => {
  db.Ticket.findByIdAndUpdate(req.params.ticketId, req.body, (err, updated) => {
    if(err) return console.log(err);
    req.flash('success', 'Ticket Closed Successfully');
    res.redirect('/tickets')
  })
})

// Edit Ticket Tech Put
router.put('/:ticketId/newtech', isLoggedIn, (req, res) => {
  db.Ticket.findByIdAndUpdate(req.params.ticketId,
      req.body,
      (err, updated) => {
          if(err) return console.log(err);
          req.flash('success', `You have assigned ticket: ${req.params.ticketId}`);
          res.redirect('/tickets')
      }
  )
})

// Edit Ticket Put
router.put('/:ticketId', isLoggedIn, (req, res) => {
  db.Ticket.findByIdAndUpdate(req.params.ticketId,
      req.body,
      (err, updated) => {
          if(err) return console.log(err);
          req.flash('success', 'Your ticket was updated successfully');
          res.redirect('/tickets')
      }
  )
})


// delete account from database
router.delete('/:ticketId', isLoggedIn, (req, res) => {
  db.Ticket.findByIdAndDelete(req.params.ticketId, (err, deleted) => {
      if(err) return console.log(err);
      req.flash('success', 'Ticket successfully deleted');
      res.redirect('/tickets');
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