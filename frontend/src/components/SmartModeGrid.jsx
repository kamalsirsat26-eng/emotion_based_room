import { motion } from 'framer-motion';

const modes = [
  { title: 'Gaming Mode', subtitle: 'Neon boost with energizing visuals' },
  { title: 'Sleep Mode', subtitle: 'Soft dim lighting with gentle ambience' },
  { title: 'Study Mode', subtitle: 'Focus atmosphere with intelligent cues' },
  { title: 'Meditation Mode', subtitle: 'Calming space for deep relaxation' },
  { title: 'Romantic Mode', subtitle: 'Warm glow and intimate audio' },
  { title: 'Focus Mode', subtitle: 'Clear clarity with productivity flow' }
];

function SmartModeGrid({ selectedMode, onSelect, themeColor }) {
  return (
    <div className="glass-panel rounded-[2rem] border border-slate-700/40 p-6 shadow-glow">
      <p className="text-cyan-300 uppercase tracking-[0.3em] text-xs">Smart modes</p>
      <h3 className="mt-3 text-2xl font-semibold">Prebuilt room scenes</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {modes.map((mode) => {
          const active = mode.title === selectedMode;
          return (
            <motion.button
              key={mode.title}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(mode.title)}
              className={`group rounded-3xl border p-4 text-left transition ${active ? 'border-cyan-400/60 bg-slate-900/80 shadow-glow' : 'border-slate-700/40 bg-slate-950/70 hover:border-cyan-300/40 hover:bg-slate-900/80'}`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold text-white">{mode.title}</p>
                {active && <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-300">Active</span>}
              </div>
              <p className="mt-3 text-sm text-slate-400">{mode.subtitle}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default SmartModeGrid;
