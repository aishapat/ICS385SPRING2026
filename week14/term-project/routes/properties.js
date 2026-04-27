const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// get all the properties and show them on the page
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.render('properties', { properties });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get one specific property by its ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// add a guest review to a property
router.post('/:id/reviews', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    property.reviews.push(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// filter properties by minimum rating using $gte
router.get('/filter/rating', async (req, res) => {
  try {
    const minRating = req.query.min || 3;
    const properties = await Property.find({ avgRating: { $gte: Number(minRating) } });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;