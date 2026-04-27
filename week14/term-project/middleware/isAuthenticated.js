// middleware/isAuthenticated.js - route guard for protected admin pages

module.exports = function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next(); // user is logged in - proceed
    res.redirect('/admin/login'); // not logged in - redirect to login
  };