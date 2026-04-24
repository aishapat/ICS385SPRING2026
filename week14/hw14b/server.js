// server.js - main Express app with Passport.js authentication

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const initPassport = require('./passport-config');
const User = require('./models/User');
const isAuthenticated = require('./middleware/isAuthenticated');

const app = express();

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// session middleware - must come before passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// passport middleware
initPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// GET /register - show registration form
app.get('/register', (req, res) => {
  res.send(`
    <h1>Register</h1>
    <form action="/register" method="POST">
      <label>Email:</label><br/>
      <input type="email" name="email" required/><br/><br/>
      <label>Password:</label><br/>
      <input type="password" name="password" required/><br/><br/>
      <button type="submit">Register</button>
    </form>
    <p><a href="/login">Already have an account? Login</a></p>
  `);
});

// POST /register - create new user with hashed password
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.send('Email already registered. <a href="/login">Login</a>');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).send('Error: ' + err.message);
  }
});

// GET /login - show login form
app.get('/login', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/profile');
  res.send(`
    <h1>Login</h1>
    <form action="/login" method="POST">
      <label>Email:</label><br/>
      <input type="email" name="email" required/><br/><br/>
      <label>Password:</label><br/>
      <input type="password" name="password" required/><br/><br/>
      <button type="submit">Login</button>
    </form>
    <p><a href="/register">Don't have an account? Register</a></p>
  `);
});

// POST /login - authenticate with Passport
app.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));

// GET /profile - protected route
app.get('/profile', isAuthenticated, (req, res) => {
  res.send(`
    <h1>Welcome, ${req.user.email}!</h1>
    <p>Role: ${req.user.role}</p>
    <p>You are logged in as an admin.</p>
    <a href="/logout">Logout</a>
  `);
});

// GET /logout - destroy session
app.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/login');
  });
});

// start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));