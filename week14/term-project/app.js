const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcrypt');
const initPassport = require('./passport-config');
require('dotenv').config();

const app = express();

// middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set EJS as the view engine
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

// session middleware - must come before passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'luminousstays_secret_2026',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// passport middleware
initPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// existing routes
const propertiesRouter = require('./routes/properties');
app.use('/properties', propertiesRouter);

// admin auth routes
app.use('/admin', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));

// home route
app.get('/', (req, res) => {
  res.redirect('/properties');
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});