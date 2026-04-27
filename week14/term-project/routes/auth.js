// routes/auth.js - admin login and logout routes

const express = require('express');
const passport = require('passport');
const router = express.Router();

// GET /admin/login - show login form
router.get('/login', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/admin/dashboard');
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Luminous Stays - Admin Login</title>
      <style>
        body { font-family: sans-serif; background: #e0f4ff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 360px; text-align: center; }
        h1 { color: #0096c7; font-size: 24px; margin-bottom: 8px; }
        p { color: #555; margin-bottom: 24px; }
        label { display: block; text-align: left; color: #333; margin-bottom: 4px; font-size: 14px; }
        input { width: 100%; padding: 10px; margin-bottom: 16px; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; box-sizing: border-box; }
        button { width: 100%; padding: 12px; background: #0096c7; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; }
        button:hover { background: #0077b6; }
        .error { color: red; font-size: 13px; margin-bottom: 12px; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Luminous Stays</h1>
        <p>Admin Login</p>
        ${req.query.error ? '<p class="error">Invalid credentials. Please try again.</p>' : ''}
        <form action="/admin/login" method="POST">
          <label>Email</label>
          <input type="email" name="email" placeholder="admin@luminousstays.com" required/>
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter your password" required/>
          <button type="submit">Login</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// POST /admin/login - authenticate with Passport
router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin/dashboard',
  failureRedirect: '/admin/login?error=true'
}));

// GET /admin/logout - destroy session
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/admin/login');
  });
});

module.exports = router;