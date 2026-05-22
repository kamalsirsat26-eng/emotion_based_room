const express = require('express');
const { protect } = require('../middleware/auth');
const MoodLog = require('../models/MoodLog');
const router = express.Router();

const moodScoreMap = {
  Happy: 95,
  Sad: 35,
  Angry: 25,
  Neutral: 65,
  Relaxed: 88,
  Stressed: 40
};

router.post('/log', protect, async (req, res) => {
  try {
    const { emotion, confidence, energyLevel } = req.body;
    const moodScore = moodScoreMap[emotion] || 60;
    const log = await MoodLog.create({
      userId: req.user._id,
      emotion,
      confidence,
      energyLevel,
      moodScore
    });
    res.status(201).json({ log });
  } catch (error) {
    res.status(500).json({ message: 'Could not save mood entry.', error: error.message });
  }
});

router.get('/trends', protect, async (req, res) => {
  try {
    const history = await MoodLog.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(35);
    res.json({ trends: history });
  } catch (error) {
    res.status(500).json({ message: 'Could not load mood trends.', error: error.message });
  }
});

module.exports = router;
