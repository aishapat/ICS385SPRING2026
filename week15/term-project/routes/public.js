// routes/public.js - public marketing page and dashboard routes

const express = require('express');
const router = express.Router();

// GET / - marketing page
router.get('/', (req, res) => {
  res.render('index', { user: req.user || null });
});

// GET /dashboard - visitor statistics dashboard
router.get('/dashboard', (req, res) => {
  res.render('dashboard', { user: req.user || null });
});

module.exports = router;