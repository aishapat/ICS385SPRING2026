// Property.js - Mongoose schema for Luminous Stays vacation rental properties
// Generated with assistance from Claude (Anthropic)

const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  // Name of the vacation rental property
  name: {
    type: String,
    required: true
  },
  // Hawaiian island where the property is located
  island: {
    type: String,
    required: true
  },
  // Type of property - hotel or vacation rental
  type: {
    type: String,
    enum: ['hotel', 'vacation rental'],
    required: true
  },
  // Brief description of the property
  description: {
    type: String,
    required: true
  },
  // List of amenities available at the property
  amenities: {
    type: [String],
    required: true
  },
  // Target visitor segment (e.g. eco-tourists, honeymooners)
  targetSegment: {
    type: String,
    required: true
  },
  // URL to the property's main image
  imageURL: {
    type: String
  }
});

module.exports = mongoose.model('Property', PropertySchema);