const mongoose = require('mongoose');

const tourismDataSchema = new mongoose.Schema({
  group: {
    type: String,
    required: true,
    index: true,
    trim: true, // I added trim to clean up any extra spaces from the CSV import
    maxlength: [100, 'Group name is too long'] // added a max length so bad data cant get in
  },
  indicator: {
    type: String,
    required: true,
    index: true,
    trim: true, // same trim fix here
    maxlength: [100, 'Indicator name is too long']
  },
  units: {
    type: String,
    default: 'days'
  },
  yearlyData: [{
    year: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true,
      min: [1, 'LOS value cant be less than 1'], // added min/max so obviously wrong numbers get rejected
      max: [60, 'LOS value seems way too high, check the data']
    }
  }]
}, {
  timestamps: true
});

// Compound index for faster queries (original)
// this makes searching by group + indicator much faster
tourismDataSchema.index({ group: 1, indicator: 1 });

// I added a unique index so the same group/indicator combo cant be imported twice
// without this running the import script more than once would create duplicate records
tourismDataSchema.index({ group: 1, indicator: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('TourismData', tourismDataSchema);