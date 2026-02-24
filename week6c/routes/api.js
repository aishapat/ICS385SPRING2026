const express = require('express');
const router = express.Router();
const TourismData = require('../models/TourismData');

// I added express-validator to check and clean user inputs
// without this someone could send bad data into the database
const { body, validationResult } = require('express-validator');

// Get all unique categories (groups) - original
router.get('/categories', async (req, res) => {
  try {
    const categories = await TourismData.distinct('group');
    res.json({ success: true, data: categories.sort() });
  } catch (error) {
    // fixed: only send the message not the full error object
    // showing the full error could reveal info about the server
    res.status(500).json({ success: false, error: 'Could not retrieve categories.' });
  }
});

// Get all unique locations (indicators) - original
router.get('/locations', async (req, res) => {
  try {
    const locations = await TourismData.distinct('indicator');
    res.json({ success: true, data: locations.sort() });
  } catch (error) {
    // same fix as above, hiding raw error from the user
    res.status(500).json({ success: false, error: 'Could not retrieve locations.' });
  }
});

// I added these validation rules for the /calculate route
// they trim whitespace, check the input isn't empty, and escape special characters
// this helps prevent NoSQL injection attacks
const calculateValidation = [
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required.')
    .isLength({ max: 100 }).withMessage('Category is too long.')
    .escape(),
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Location is too long.')
    .escape(),
];

// Calculate average length of stay - original with validation added
router.post('/calculate', calculateValidation, async (req, res) => {

  // check if validation passed, if not send back the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { category, location } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        error: 'Category is required'
      });
    }

    // Build query (original)
    const query = { group: category };
    if (location) {
      query.indicator = location;
    }

    // Find matching records (original)
    const records = await TourismData.find(query);

    if (records.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No data found for the specified criteria'
      });
    }

    // Collect all values (original)
    const allValues = [];
    records.forEach(record => {
      record.yearlyData.forEach(yearData => {
        allValues.push({
          year: yearData.year,
          value: yearData.value,
          location: record.indicator
        });
      });
    });

    if (allValues.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No valid data points found'
      });
    }

    // Calculate statistics (original)
    const values = allValues.map(v => v.value);
    const sum = values.reduce((a, b) => a + b, 0);
    const average = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    const minEntry = allValues.find(v => v.value === min);
    const maxEntry = allValues.find(v => v.value === max);

    // Calculate year-over-year data for chart (original)
    const yearlyAverages = {};
    allValues.forEach(item => {
      if (!yearlyAverages[item.year]) {
        yearlyAverages[item.year] = [];
      }
      yearlyAverages[item.year].push(item.value);
    });

    const chartData = Object.keys(yearlyAverages).sort().map(year => ({
      year,
      average: yearlyAverages[year].reduce((a, b) => a + b, 0) / yearlyAverages[year].length
    }));

    res.json({
      success: true,
      data: {
        category,
        location: location || 'All locations',
        statistics: {
          average: parseFloat(average.toFixed(2)),
          min: {
            value: min,
            year: minEntry.year,
            location: minEntry.location
          },
          max: {
            value: max,
            year: maxEntry.year,
            location: maxEntry.location
          },
          dataPoints: values.length
        },
        chartData
      }
    });

  } catch (error) {
    // fixed: hiding raw error message from the user
    res.status(500).json({ success: false, error: 'Something went wrong while calculating.' });
  }
});

// Get all data for debugging (original)
router.get('/data', async (req, res) => {
  try {
    const data = await TourismData.find().limit(100);
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Could not retrieve data.' });
  }
});

module.exports = router;