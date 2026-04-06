const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set EJS as the view engine
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

// routes
const propertiesRouter = require('./routes/properties');
app.use('/properties', propertiesRouter);

// home route
app.get('/', (req, res) => {
  res.redirect('/properties');
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});