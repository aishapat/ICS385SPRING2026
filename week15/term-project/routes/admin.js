// routes/admin.js - protected admin dashboard route

const express = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const Property = require('../models/Property');
const router = express.Router();

// GET /admin - protected admin dashboard
router.get('/', ensureAuth, async (req, res) => {
  try {
    const properties = await Property.find({});
    res.render('admin', {
      user: req.user,
      properties: properties
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;