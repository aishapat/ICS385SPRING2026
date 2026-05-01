// app.js - main Express app with Google OAuth

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
require('./config/passport');

const app = express();

// set EJS as view engine
app.set('view engine', 'ejs');

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('[OK] MongoDB connected'))
  .catch(err => console.error('[ERR]', err));

// session middleware - must come before passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 86400000 }
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// home route
app.get('/', (req, res) => res.render('home', { user: req.user }));

// profile route - protected
app.get('/profile',
  require('./middleware/ensureAuth'),
  (req, res) => res.render('profile', { user: req.user })
);

// auth routes
app.use('/auth', require('./routes/auth'));

// logout route
app.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.session.destroy(() => res.redirect('/'));
  });
});

// start server
app.listen(3000, () => console.log('Server on http://localhost:3000'));