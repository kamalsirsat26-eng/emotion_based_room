function HeatmapPanel({ emotion, accent }) {
  return (
    <div className="glass-panel rounded-[2rem] border border-slate-700/40 p-6 shadow-glow">
      <p className="text-cyan-300 uppercase tracking-[0.3em] text-xs">Emotion heatmap</p>
      <h3 className="mt-3 text-2xl font-semibold">Mood state visualization</h3>
      <div className="mt-6 grid gap-4">
        <div className="rounded-[1.8rem] border border-slate-700/30 bg-slate-950/65 p-4">
          <div className="grid gap-2">
            <div className="flex items-center justify-between text-slate-400">
              <span>Current mood</span>
              <span className="font-semibold text-white">{emotion}</span>
            </div>
            <div className="h-3 rounded-full bg-slate-800">
              <div className="h-full rounded-full" style={{ width: '76%', background: accent }} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {['Happy', 'Sad', 'Angry', 'Relaxed', 'Neutral', 'Stressed'].map((key, index) => (
            <div key={key} className="rounded-3xl border border-slate-700/40 bg-slate-950/70 p-3 text-center">
              <p className="text-sm text-slate-400">{key}</p>
              <p className="mt-3 text-xl font-semibold text-white">{Math.max(12, 18 + (index % 3) * 10)}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeatmapPanel;
