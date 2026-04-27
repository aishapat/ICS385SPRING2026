// seed-admin.js - run once to create the admin account
// run with: node seed-admin.js

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

async function seedAdmin() {
  await mongoose.connect(process.env.MONGO_URI);
  
  // check if admin already exists
  const existing = await User.findOne({ email: 'admin@luminousstays.com' });
  if (existing) {
    console.log('Admin already exists!');
    mongoose.disconnect();
    return;
  }

  // hash password and create admin
  const hashedPassword = await bcrypt.hash('LuminousAdmin2026!', 10);
  const admin = new User({
    email: 'admin@luminousstays.com',
    password: hashedPassword,
    role: 'admin'
  });

  await admin.save();
  console.log('Admin user created successfully!');
  console.log('Email: admin@luminousstays.com');
  console.log('Password: LuminousAdmin2026!');
  mongoose.disconnect();
}

seedAdmin().catch(console.error);