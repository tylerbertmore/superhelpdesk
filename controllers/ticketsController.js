const express = require('express');
const router = express.Router();
const db = require('../models');

// routes begin with /tickets

router.get('/', (req, res) => {
  res.render('dashboard/dashboard')
});

router.get('/new', (req, res) => {
  res.render('dashboard/newTicket')
});

router.get('/:ticketId/', (req, res) => {
  res.render('dashboard/showTicket')
});

router.get('/:ticketId/edit', (req, res) => {
  res.render('dashboard/editTicket')
});


module.exports = router