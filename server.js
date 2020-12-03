//---------------------------------------------------
//                     MODULES                
//---------------------------------------------------
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local');
require('dotenv').config();
const PORT = process.env.PORT;

// VIEW ENGINE
app.set('view engine', 'ejs')

//---------------------------------------------------
//                     MIDDLEWARE                
//---------------------------------------------------
app.use(express.static(__dirname + '/public'));       
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use((req, res, next) => {
  const method = req.method;
  const path = req.url;
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${method} ${path} ${timestamp}`);
  next();
});

//---------------------------------------------------
//                     ROUTES                
//---------------------------------------------------
// Root route
app.get('/', (req, res) => {
  res.send('root');
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))

