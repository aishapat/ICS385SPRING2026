// routes/auth.js - Google OAuth routes

const router = require('express').Router();
const passport = require('passport');

// GET /auth/google - redirect to Google login
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// GET /auth/google/callback - handle Google response
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect('/profile'));

module.exports = router;