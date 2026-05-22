export const emotionTheme = {
  Happy: { label: 'Happy', color: '#facc15', accent: '#fde68a', playlist: 'Sunrise Pulse' },
  Sad: { label: 'Sad', color: '#fb7185', accent: '#fbcfe8', playlist: 'Quiet Lights' },
  Angry: { label: 'Angry', color: '#60a5fa', accent: '#93c5fd', playlist: 'Cool Calm' },
  Neutral: { label: 'Neutral', color: '#94a3b8', accent: '#cbd5e1', playlist: 'Balanced Flow' },
  Relaxed: { label: 'Relaxed', color: '#34d399', accent: '#bbf7d0', playlist: 'Nature Waves' },
  Stressed: { label: 'Stressed', color: '#f97316', accent: '#fed7aa', playlist: 'Deep Breath' }
};

export const emotionRules = (expressions) => {
  const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
  const [top, confidence] = sorted[0] || ['neutral', 0];
  const base = top === 'happy' ? 'Happy' : top === 'sad' ? 'Sad' : top === 'angry' ? 'Angry' : top === 'surprised' ? 'Stressed' : top === 'fearful' ? 'Stressed' : 'Neutral';
  if (base === 'Neutral' && confidence > 0.85) return { emotion: 'Relaxed', confidence: confidence * 100 };
  return { emotion: base, confidence: confidence * 100 };
};
