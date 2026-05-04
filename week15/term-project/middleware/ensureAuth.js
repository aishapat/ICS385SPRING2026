// middleware/ensureAuth.js - route guard for protected admin pages

module.exports = function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next(); // user is logged in - proceed
  res.redirect('/login'); // not logged in - redirect to login
};