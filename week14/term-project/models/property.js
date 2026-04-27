const mongoose = require('mongoose');

// Review sub-schema - embedded inside Property
const reviewSchema = new mongoose.Schema({
    guestName: { type: String, required: true }, // name of the guest
    rating: { type: Number, min: 1, max: 5, required: true }, // rating 1-5
    comment: String, // guest comment
    date: { type: Date, default: Date.now } // date of review
  });

// Property schema with reviews embedded
  const propertySchema = new mongoose.Schema({
    name: { type: String, required: true },
    island: { type: String, required: true },
    type: { type: String, enum: ['hotel', 'vacation rental'], required: true },
    description: { type: String, required: true },
    amenities: { type: [String], required: true },
    targetSegment: { type: String, required: true },
    imageURL: { type: String },
    avgRating: { type: Number, default: 0 }, // average rating for filtering
    reviews: [reviewSchema] // embedded reviews array
  });
  
  module.exports = mongoose.model('Property', propertySchema);