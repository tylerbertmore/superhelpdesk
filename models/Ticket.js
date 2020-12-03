const mongoose = require('mongoose');


const ticketSchema = new mongoose.Schema({
  description: String,
  status: {
    type: String,
    default: 'Open'
  },
  dateCompleted: {
    type: Date,
    default: null
  },
  department: {
    type: String,
  },
  requestedBy: {
    type: String,
  },
  tech: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, {timestamps: true})



module.exports = mongoose.model('Ticket', ticketSchema);