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
const ctrl = require('./controllers');
const db = require('./models');   

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

app.use(require('express-session')({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true, // what does this do?
  cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.user;
  next();
});

//---------------------------------------------------
//                     ROUTES                
//--------------------------------------------------- 
// Root route
app.get('/', (req, res) => {
  res.render('index')
});
// Signup get route
app.get('/signup', (req, res) => {
  res.render('users/signup')
})
// signup post route
app.post('/signup', async (req, res) => {
  try{
      const newUser = new db.User({username: req.body.username, name: req.body.name, role: req.body.role})
      const registeredUser = await db.User.register(newUser, req.body.password)
      req.login(registeredUser, err => {
          if(err) return console.log(err);
          req.flash('success', 'Successfully Registered!')
          res.redirect('tickets');
      })
  } catch(e){
      req.flash('error', e.message);
      res.redirect('signup');
  }
})

// Login get route
app.get('/login', (req, res) => {
  res.render('users/login');
});
//Login post route
app.post('/login', passport.authenticate('local', {
  failureFlash: true,
  failureRedirect: '/login',
  }), (req, res) => {
  req.flash('success', 'Successfully logged in!');
  res.redirect('tickets');
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have logged out Successfully');
  res.redirect('login')
})

// Users controller
app.use('/users', ctrl.users);
// Tickets controller
app.use('/tickets', ctrl.tickets);


//404
app.get('*', (req, res) => {
  res.render('404');
})



// Listener
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))

