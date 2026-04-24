// passport-config.js - configures Passport LocalStrategy for email + password login

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/User');

module.exports = function initializePassport(passport) {

  // LocalStrategy - called when POST /login is submitted
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        // look up user by email in MongoDB
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: 'Email not found.' });

        // compare submitted password with stored bcrypt hash
        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: 'Incorrect password.' });

        // success
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  // serializeUser - stores user id in session
  passport.serializeUser((user, done) => done(null, user.id));

  // deserializeUser - retrieves full user from MongoDB on each request
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};