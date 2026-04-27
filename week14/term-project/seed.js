const mongoose = require('mongoose');
const Property = require('./models/Property');
require('dotenv').config();

// connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// sample properties for Luminous Stays
const properties = [
  {
    name: 'Luminous Stays Wailea',
    island: 'Maui',
    type: 'vacation rental',
    description: 'A luxury beachfront stay with amazing ocean views and within walking distance to shopping centers.',
    amenities: ['WiFi', 'Pool', 'Gym', 'Ocean View', 'Parking'],
    targetSegment: 'tourists',
    imageURL: 'https://example.com/wailea.jpg',
    avgRating: 5,
    reviews: [
      { guestName: 'Aisha Patterson', rating: 5, comment: 'Amazing place, loved every moment!' },
      { guestName: 'Jessa Sagario', rating: 5, comment: 'Best vacation rental on Maui!' }
    ]
  },
  {
    name: 'Luminous Stays Kihei',
    island: 'Maui',
    type: 'vacation rental',
    description: 'A cozy beachside stay perfect for relaxing.',
    amenities: ['WiFi', 'Pool', 'Beach Access', 'Parking'],
    targetSegment: 'tourists',
    imageURL: 'https://example.com/kihei.jpg',
    avgRating: 4,
    reviews: [
      { guestName: 'Abe Kamaka', rating: 4, comment: 'Great location, very clean!' }
    ]
  },
  {
    name: 'Luminous Stays Hana',
    island: 'Maui',
    type: 'vacation rental',
    description: 'A peaceful secluded stay near tropical waterfalls and scenic hiking trails.',
    amenities: ['WiFi', 'Garden', 'Hiking Trails', 'Parking'],
    targetSegment: 'eco-tourists',
    imageURL: 'https://example.com/hana.jpg',
    avgRating: 4,
    reviews: [
      { guestName: 'John Smith', rating: 4, comment: 'So peaceful and beautiful!' }
    ]
  },
  {
    name: 'Luminous Stays Lahaina',
    island: 'Maui',
    type: 'vacation rental',
    description: 'A cozy luxury rental near Lahaina with great ocean views.',
    amenities: ['WiFi', 'Ocean View', 'Gym', 'Parking', 'Pool'],
    targetSegment: 'tourists',
    imageURL: 'https://example.com/lahaina.jpg',
    avgRating: 4,
    reviews: []
  },
  {
    name: 'Luminous Stays Paia',
    island: 'Maui',
    type: 'vacation rental',
    description: 'A chill luxury spot in Paia close to the beach and surf spots.',
    amenities: ['WiFi', 'Pool', 'Gym', 'Ocean View', 'Parking'],
    targetSegment: 'tourists',
    imageURL: 'https://example.com/paia.jpg',
    avgRating: 3,
    reviews: []
  }
];

// insert properties into MongoDB
Property.deleteMany({})
  .then(() => Property.insertMany(properties))
  .then(() => {
    console.log('5 properties seeded successfully!');
    mongoose.connection.close();
  })
  .catch(err => console.log(err));