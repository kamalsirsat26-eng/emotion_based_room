const mongoose = require('mongoose');

const moodLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  emotion: { type: String, required: true },
  confidence: { type: Number, required: true },
  moodScore: { type: Number, required: true },
  energyLevel: { type: Number, required: true },
  location: { type: String, default: 'smart room' }
}, { timestamps: true });

module.exports = mongoose.model('MoodLog', moodLogSchema);
