import { useMemo } from 'react';

const moods = {
  Happy: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
  Sad: 'https://www.youtube.com/embed/7wtfhZwyrcc',
  Angry: 'https://www.youtube.com/embed/W5Zy6YcWmXk',
  Neutral: 'https://www.youtube.com/embed/l9PxOanFjxQ',
  Relaxed: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
  Stressed: 'https://www.youtube.com/embed/IcrbM1l_BoI'
};

function MusicPlayer({ mood = 'Neutral', emotionColor }) {
  const src = useMemo(() => moods[mood] || moods.Neutral, [mood]);
  return (
    <div className="mt-5 rounded-[1.8rem] border border-slate-700/40 bg-slate-950/80 p-4">
      <div className="flex items-center justify-between gap-4 text-slate-300">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Mood-powered track</p>
          <p className="mt-1 text-base font-semibold text-white">{mood} soundscape</p>
        </div>
        <div className="h-10 w-10 rounded-full" style={{ background: emotionColor }} />
      </div>
      <div className="mt-5 aspect-video overflow-hidden rounded-3xl border border-slate-800 bg-black/40">
        <iframe
          className="h-full w-full"
          src={src}
          title="MoodSync music player"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default MusicPlayer;
