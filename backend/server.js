require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { connectDatabase } = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const moodRoutes = require('./routes/mood');
const iotRoutes = require('./routes/iot');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

connectDatabase();

app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));
app.set('io', io);

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  message: { message: 'Too many requests, please try again later.' }
});
app.use(limiter);

app.get('/api/health', (req, res) => res.json({ status: 'online', timestamp: Date.now() }));
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/iot', iotRoutes);

io.on('connection', (socket) => {
  socket.emit('iot:update', { mode: 'idle', status: 'connected', energy: 11.2 });
  socket.on('device:command', (payload) => {
    const state = { ...payload, updatedAt: new Date().toISOString() };
    socket.broadcast.emit('iot:update', state);
    socket.emit('iot:update', state);
  });
});

server.listen(PORT, () => {
  console.log(`MoodSync backend running on http://localhost:${PORT}`);
});
