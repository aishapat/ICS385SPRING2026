// seed.js - Inserts sample property records into MongoDB
// Generated with assistance from Claude (Anthropic)

const mongoose = require('mongoose');
const Property = require('./models/Property');
require('dotenv').config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const properties = [
  {
    name: 'Luminous Stays Wailea',
    island: 'Maui',
    type: 'vacation rental',
    description: 'A luxurious and secluded getaway in Wailea with beautiful oceanfront views. Perfect for travelers who want privacy and comfort.',
    amenities: ['WiFi', 'Pool', 'Gym', 'Ocean View', 'Parking'],
    targetSegment: 'tourists',
    imageURL: 'https://example.com/wailea.jpg'
  },
  {
    name: 'Luminous Stays Kihei',
    island: 'Maui',
    type: 'vacation rental',
    description: 'A nice and relaxing spot in Kihei right by the beach. Great for anyone looking to chill and enjoy the ocean.',
    amenities: ['WiFi', 'Pool', 'Beach Access', 'Parking', 'Air Conditioning'],
    targetSegment: 'tourists',
    imageURL: 'https://example.com/kihei.jpg'
  },
  {
    name: 'Luminous Stays Lahaina',
    island: 'Maui',
    type: 'vacation rental',
    description: 'A cozy luxury rental near Lahaina with great ocean views. Close to food spots and things to do.',
    amenities: ['WiFi', 'Ocean View', 'Gym', 'Parking', 'Pool'],
    targetSegment: 'tourists',
    imageURL: 'https://example.com/lahaina.jpg'
  },
  {
    name: 'Luminous Stays Hana',
    island: 'Maui',
    type: 'vacation rental',
    description: 'A secluded and peaceful rental near the Road to Hana. Super private with amazing views all around.',
    amenities: ['WiFi', 'Ocean View', 'Garden', 'Parking', 'Outdoor Shower'],
    targetSegment: 'tourists',
    imageURL: 'https://example.com/hana.jpg'
  },
  {
    name: 'Luminous Stays Paia',
    island: 'Maui',
    type: 'vacation rental',
    description: 'A chill luxury spot in Paia close to the beach and surf spots. Good vibes and great views.',
    amenities: ['WiFi', 'Pool', 'Gym', 'Ocean View', 'Parking'],
    targetSegment: 'tourists',
    imageURL: 'https://example.com/paia.jpg'
  }
];

// Insert properties into MongoDB
Property.insertMany(properties)
  .then(() => {
    console.log('5 properties seeded successfully!');
    mongoose.connection.close();
  })
  .catch(err => console.log(err));