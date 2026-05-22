# MoodSync — Emotion Based Smart Room

MoodSync is a polished full-stack smart room platform that blends AI emotion detection, ambient automation, IoT simulation, and premium dashboard analytics.

## Highlights

- **AI Emotion Detection** via webcam using `face-api.js`
- **Smart Room Automation** for lighting, temperature, music, and relaxation modes
- **Modern React + Vite frontend** with Tailwind CSS and Framer Motion
- **Node.js + Express backend** with MongoDB support and secure JWT auth
- **Interactive IoT dashboard** with simulated smart bulbs, AC, speakers, curtains, and aroma diffusion
- **AI analytics** with mood history, stress alerts, and personalized recommendations

## Structure

- `/frontend` - React application
- `/backend` - Express API server

## Getting Started

### Backend

1. Navigate to `/backend`
2. Copy `.env.example` to `.env`
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the backend:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to `/frontend`
2. Copy `.env.example` to `.env`
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```

## Features

- **Live emotion analytics** with mood tracking and heatmap UI
- **Smart mode activation** for Gaming, Sleep, Study, Meditation, Romantic, and Focus experiences
- **Voice assistant** for ambient commands and AI companion guidance
- **YouTube-based music integration** for mood-driven playback
- **Secure authentication** with backend login/signup and optional Google Sign-In support
- **Responsive, futuristic UI** with glassmorphism, animated gradients, neon glow cards, and dashboard charts

## Notes

- Firebase Google Sign-In requires a properly configured Firebase project and environment variables in `/frontend/.env`
- MongoDB must be available locally or via a hosted connection set in `/backend/.env`

## Recommended Tech

- Node.js 20+
- npm 10+
- MongoDB 7+

---

Build a futuristic smart room experience with MoodSync — ideal for portfolio demos and startup-style product showcases.
