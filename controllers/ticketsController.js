const express = require('express');
const router = express.Router();
const db = require('../models');

// routes begin with /tickets

router.get('/', (req, res) => {
  res.render('dashboard/dashboard')
});
// New Ticket Get
router.get('/new', (req, res) => {
  res.render('dashboard/newTicket')
});
//New Ticket POST
router.post('/new', (req, res) => {
  db.Ticket.create({description: req.body.description, department: req.body.department, requestedBy: req.body.requestedBy, tech: null}, (err, newTicket) =>{
    if(err){
      console.log(err)
    }
    console.log(newTicket)
  })
  req.flash('success', 'Ticket Created Successfully');
  res.redirect('/tickets')
});
router.get('/:ticketId/', (req, res) => {
  res.render('dashboard/showTicket')
});

router.get('/:ticketId/edit', (req, res) => {
  res.render('dashboard/editTicket')
});


module.exports = router