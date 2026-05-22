const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

const simulatedDevices = {
  bulbs: { color: '#78d7ff', brightness: 76 },
  thermostat: { temperature: 22, fan: 'medium' },
  speaker: { volume: 48, playlist: 'Ambient Flow' },
  curtains: { state: 'open' },
  diffuser: { enabled: true }
};

router.get('/status', protect, (req, res) => {
  res.json({ devices: simulatedDevices, mode: 'MoodSync Active', lastSync: new Date().toISOString() });
});

router.post('/control', protect, (req, res) => {
  const updates = req.body;
  Object.assign(simulatedDevices, updates);
  req.app.get('io')?.emit('iot:update', { devices: simulatedDevices, mode: 'manual override' });
  res.json({ devices: simulatedDevices });
});

router.get('/admin', protect, adminOnly, (req, res) => {
  res.json({ devices: simulatedDevices, audit: { users: 72, automationRules: 14, alerts: 3 } });
});

module.exports = router;
