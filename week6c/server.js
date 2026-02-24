const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// I added these two packages after the code review
// helmet helps protect the app by setting safer browser headers
// rateLimit stops people from sending too many requests at once
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// keeping the database connection in .env is safer
// that way the password isn't visible in the code
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hawaii_tourism';

// turns on helmet so the app has better security headers
app.use(helmet());

// this limits each user to 100 requests every 15 minutes
// without this anyone could spam the API and crash the server
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});

// original middleware from prof
app.use(cors());
app.use(express.json({ limit: '10kb' })); // added size limit so nobody can send huge requests
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// added apiLimiter here so all /api routes are protected
app.use('/api', apiLimiter, apiRoutes);

// serve the main page (original)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// connect to MongoDB then start the server (original)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    // only showing the message not the full error so sensitive info doesn't leak
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });

// I added this to catch any errors that slip through
// it sends a simple message to the user instead of showing the full error
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong on the server.'
  });
});

// closes the database connection when the server stops (original)
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('\nMongoDB connection closed');
  process.exit(0);
});