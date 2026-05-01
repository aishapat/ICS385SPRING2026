// middleware/ensureAuth.js - route guard for protected pages

module.exports = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next(); // user is logged in - proceed
    return res.redirect('/'); // not logged in - redirect to home
  };