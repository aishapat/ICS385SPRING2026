// middleware/isAuthenticated.js - route guard for protected pages

// checks if user is logged in before allowing access
module.exports = function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next(); // user is logged in - proceed
    res.redirect('/login'); // not logged in - redirect to login
};