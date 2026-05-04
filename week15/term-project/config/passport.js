// config/passport.js - Local and Google OAuth strategies

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

// local strategy - email and password login
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: 'Email not found.' });
      if (!user.password) return done(null, false, { message: 'Please sign in with Google.' });
      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: 'Incorrect password.' });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // find by googleId first
    let user = await User.findOne({ googleId: profile.id });
    if (user) return done(null, user);

    // link to existing local account by email
    user = await User.findOne({ email: profile.emails[0].value.toLowerCase() });
    if (user) {
      user.googleId = profile.id;
      user.provider = 'google';
      await user.save();
      return done(null, user);
    }

    // create new user
    user = await User.create({
      googleId: profile.id,
      email: profile.emails[0].value.toLowerCase(),
      displayName: profile.displayName,
      provider: 'google'
    });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// serialize user id into session
passport.serializeUser((user, done) => done(null, user.id));

// deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});