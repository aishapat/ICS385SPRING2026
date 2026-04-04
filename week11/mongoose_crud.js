const mongoose = require('mongoose');

// this schema is for my hotel properties
const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },        // hotel name
  rating: { type: Number, required: true },      // star rating (like 4 or 5 stars)
  location: { type: String, required: true },    // where it’s located
  description: { type: String, required: true }  // short description of the hotel
});

// this schema is for amenities (what the place includes)
const amenitiesSchema = new mongoose.Schema({
  pool: { type: Boolean, default: false },    // does it have a pool
  lawn: { type: Boolean, default: false },    // does it have a lawn/outdoor space
  BBQ: { type: Boolean, default: false },     // BBQ available or not
  laundry: { type: Boolean, default: false }  // laundry included or not
});

// creating models from schemas so I can use them in the database
const Hotel = mongoose.model('Hotel', hotelSchema);
const Amenities = mongoose.model('Amenities', amenitiesSchema);

// this function runs all my CRUD operations
async function runOperations() {

  // first I clear everything so I don’t get duplicates when I rerun it
  await Hotel.deleteMany({});
  await Amenities.deleteMany({});
  console.log('Deleted all existing Hotel and Amenities records');

  // inserting 3 sample hotels into the database
  await Hotel.insertMany([
    { name: 'Luminous Stays Wailea', rating: 5, location: 'Wailea, Maui', description: 'A luxury beachfront stay with an amazing ocean views and within walking distance to shopping centers' },
    { name: 'Luminous Stays Kihei', rating: 5, location: 'Kihei, Maui', description: 'A cozy beachside stay perfect for relaxing' },
    { name: 'Luminous Stays Hana', rating: 4, location: 'Hana, Maui', description: 'A peaceful, secluded stay near tropical waterfalls and scenic hiking trails' }
  ]);
  console.log('Inserted 3 hotels');

  // inserting amenities (each object represents one setup)
  await Amenities.insertMany([
    { pool: true, lawn: true, BBQ: false, laundry: true },
    { pool: true, lawn: false, BBQ: true, laundry: true },
    { pool: false, lawn: true, BBQ: true, laundry: false }
  ]);
  console.log('Inserted 3 amenities records');

  // finding ONE hotel by name
  const foundHotel = await Hotel.findOne({ name: 'Luminous Stays Wailea' });
  console.log('Found hotel by name:', foundHotel);

  // finding ALL amenities that include a pool
  const poolAmenities = await Amenities.find({ pool: true });
  console.log('Amenities with pool:', poolAmenities);
}

// this runs everything
async function main() {
  console.log('\n--- Connecting to LOCAL MongoDB ---');

  // connecting to my local database first
  await mongoose.connect('mongodb://127.0.0.1:27017/luminousStays');
  console.log('Connected to LOCAL MongoDB');

  await runOperations();

  // closing local connection before switching
  await mongoose.connection.close();
  console.log('Local connection closed\n');

  console.log('--- Connecting to ATLAS MongoDB ---');

  // now connecting to MongoDB Atlas (cloud database)
  await mongoose.connect('mongodb+srv://aishapat:Maui808@cluster0.fu0lo1k.mongodb.net/luminousStays');
  console.log('Connected to ATLAS MongoDB');

  await runOperations();

  // closing atlas connection
  await mongoose.connection.close();
  console.log('Atlas connection closed\n');
}

main();