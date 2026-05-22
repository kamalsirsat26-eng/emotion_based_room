const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true, unique: true },
  password: { type: String, required: true, select: false },
  avatar: { type: String, default: '' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  preferences: {
    theme: { type: String, default: 'futuristic' },
    favoriteMode: { type: String, default: 'Relax Mode' }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
