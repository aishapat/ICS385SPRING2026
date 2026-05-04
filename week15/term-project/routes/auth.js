// routes/auth.js - login, register, Google OAuth, and logout routes

const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

// GET /login - show login form
router.get('/login', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/admin');
  res.render('login', { error: req.query.error || null });
});

// POST /login - local authentication
router.post('/login',
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login?error=Invalid credentials'
  })
);

// GET /register - show register form
router.get('/register', (req, res) => {
  res.render('register', { error: null });
});

// POST /register - create new admin user
router.post('/register',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.render('register', { error: 'Invalid email or password too short' });
      
      const { email, password } = req.body;
      const existing = await User.findOne({ email });
      if (existing) return res.render('register', { error: 'Email already registered' });
      
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ email, password: hashedPassword, provider: 'local' });
      res.redirect('/login');
    } catch (err) {
      res.status(500).send('Error: ' + err.message);
    }
  }
);

// GET /auth/google - Google OAuth login
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// GET /auth/google/callback - Google OAuth callback
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login?error=Google login failed' }),
  (req, res) => res.redirect('/admin')
);

// POST /logout - destroy session
router.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.session.destroy(() => res.redirect('/login'));
  });
});

module.exports = router;