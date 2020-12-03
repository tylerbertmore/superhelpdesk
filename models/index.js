const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected...');
})

mongoose.connection.on('error', (error) => {
  console.log(error);
})

module.exports = {
  User: require('./User'),
  Ticket: require('./Ticket'),
}