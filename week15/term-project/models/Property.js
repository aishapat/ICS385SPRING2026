// models/Property.js - Property schema from Week 10

const mongoose = require('mongoose');

// review sub-schema embedded in property
const reviewSchema = new mongoose.Schema({
  guestName: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// property schema
const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  island: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
  amenities: [String],
  targetSegment: { type: String },
  imageURL: { type: String },
  avgRating: { type: Number },
  reviews: [reviewSchema]
});

module.exports = mongoose.model('Property', propertySchema);