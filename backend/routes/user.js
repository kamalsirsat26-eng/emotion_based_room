const express = require('express');
const { protect } = require('../middleware/auth');
const MoodLog = require('../models/MoodLog');
const router = express.Router();

router.get('/profile', protect, async (req, res) => {
  res.json({ user: req.user });
});

router.get('/history', protect, async (req, res) => {
  try {
    const history = await MoodLog.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(50);
    res.json({ history });
  } catch (error) {
    res.status(500).json({ message: 'Unable to load mood history.', error: error.message });
  }
});

module.exports = router;
