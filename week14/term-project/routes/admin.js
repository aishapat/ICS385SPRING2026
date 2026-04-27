// routes/admin.js - protected admin dashboard route

const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const Property = require('../models/Property');
const router = express.Router();

// GET /admin/dashboard - protected route
router.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    const properties = await Property.find({});
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Luminous Stays - Admin Dashboard</title>
        <style>
          body { font-family: sans-serif; background: #e0f4ff; margin: 0; padding: 0; }
          header { background: #0096c7; padding: 16px 40px; display: flex; justify-content: space-between; align-items: center; }
          header h1 { color: white; margin: 0; font-size: 22px; }
          header a { color: white; text-decoration: none; font-size: 14px; background: #ff6b35; padding: 8px 16px; border-radius: 8px; }
          .container { padding: 40px; max-width: 1000px; margin: 0 auto; }
          .welcome { background: white; padding: 24px; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
          .welcome h2 { color: #0096c7; margin: 0 0 8px; }
          .welcome p { color: #555; margin: 0; }
          table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
          th { background: #0096c7; color: white; padding: 12px 16px; text-align: left; }
          td { padding: 12px 16px; border-bottom: 1px solid #e0f4ff; color: #333; }
          tr:last-child td { border-bottom: none; }
        </style>
      </head>
      <body>
        <header>
          <h1>Luminous Stays — Admin</h1>
          <a href="/admin/logout">Logout</a>
        </header>
        <div class="container">
          <div class="welcome">
            <h2>Welcome, ${req.user.email}!</h2>
            <p>You are logged in as an admin. Manage your Luminous Stays properties below.</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Property Name</th>
                <th>Island</th>
                <th>Type</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              ${properties.map(p => `
                <tr>
                  <td>${p.name}</td>
                  <td>${p.island}</td>
                  <td>${p.type}</td>
                  <td>${p.avgRating || 'N/A'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;