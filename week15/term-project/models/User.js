// models/User.js - User schema supporting both local and Google OAuth login

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // local auth fields
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String }, // optional - not needed for Google OAuth users
  
  // Google OAuth fields
  googleId: { type: String, sparse: true },
  displayName: { type: String },
  provider: { type: String, enum: ['local', 'google'], default: 'local' },
  
  // admin role
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);