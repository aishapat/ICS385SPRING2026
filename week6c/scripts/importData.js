const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const TourismData = require('../models/TourismData');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hawaii_tourism';
const CSV_FILE =
  process.env.CSV_FILE || path.join(__dirname, '../standalone/data.csv');

// Keywords to skip (footer rows) - original
const SKIP_KEYWORDS = [
  'Data is updated',
  'Source of Data',
  'Seasonally adjusted',
  'Hotel performance'
];

async function importData() {
  try {
    // Connect to MongoDB (original)
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data (original)
    await TourismData.deleteMany({});
    console.log('Cleared existing data');

    const records = [];

    // Read CSV file (original)
    await new Promise((resolve, reject) => {
      fs.createReadStream(CSV_FILE)
        .pipe(csv())
        .on('data', (row) => {
          const group = row.Group || '';

          // Skip footer/metadata rows (original)
          if (!group || SKIP_KEYWORDS.some(keyword => group.includes(keyword))) {
            return;
          }

          const indicator = row.Indicator || '';
          const units = row.Units || 'days';

          // I added this check so rows missing a group or indicator get skipped
          // without this bad rows could still make it into the database
          if (!group.trim() || !indicator.trim()) {
            console.log(`Skipping row - missing group or indicator`);
            return;
          }

          // Extract yearly data (original)
          const yearlyData = [];
          Object.keys(row).forEach(key => {
            // Check if key is a year (numeric) - original
            if (!isNaN(key) && row[key] && row[key].trim() !== '') {
              try {
                const value = parseFloat(row[key]);
                // I added a range check here so obviously wrong numbers get skipped
                // for example a LOS of 0 or 999 would be bad data from the CSV
                if (!isNaN(value) && value >= 1 && value <= 60) {
                  yearlyData.push({
                    year: key,
                    value: value
                  });
                }
              } catch (e) {
                // Skip invalid values (original)
              }
            }
          });

          if (yearlyData.length > 0) {
            records.push({
              group,
              indicator,
              units,
              yearlyData
            });
          }
        })
        .on('end', resolve)
        .on('error', reject);
    });

    // Insert records into MongoDB (original)
    // I changed insertMany to use ordered: false so one bad record
    // doesnt stop the whole import from finishing
    if (records.length > 0) {
      await TourismData.insertMany(records, { ordered: false });
      console.log(`Successfully imported ${records.length} records`);
    } else {
      console.log('No records to import');
    }

    // Display summary (original)
    const categories = await TourismData.distinct('group');
    const locations = await TourismData.distinct('indicator');

    console.log('\nImport Summary:');
    console.log(`- Total records: ${records.length}`);
    console.log(`- Categories: ${categories.length}`);
    console.log(`- Locations: ${locations.length}`);

  } catch (error) {
    // fixed: only showing the error message not the full stack trace
    console.error('Error importing data:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\nMongoDB connection closed');
  }
}

importData();