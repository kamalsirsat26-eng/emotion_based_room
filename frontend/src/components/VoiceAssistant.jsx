import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMic, FiSend } from 'react-icons/fi';

const commands = [
  { label: 'Relax mode', detail: 'Dim lights and start nature ambience' },
  { label: 'Party mode', detail: 'Launch upbeat lighting with energetic music' },
  { label: 'Sleep mode', detail: 'Soft tones and low brightness' },
  { label: 'Focus mode', detail: 'Clear blue tones and calm ambient audio' }
];

function VoiceAssistant({ activeMode, setMode }) {
  const [status, setStatus] = useState('Ready to listen');

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const handleCommand = (mode) => {
    setMode(mode);
    setStatus(`Activated ${mode}`);
    speak(`Activating ${mode}`);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel rounded-[2rem] border border-slate-700/40 p-6 shadow-glow">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-cyan-300 uppercase tracking-[0.3em] text-xs">AI voice companion</p>
          <h3 className="mt-3 text-2xl font-semibold">Command your room</h3>
        </div>
        <button onClick={() => speak('Voice assistant engaged')} className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/50">
          <FiMic className="inline-block mr-2" /> Listen
        </button>
      </div>
      <p className="mt-4 text-slate-400">Say a voice command or tap one of the smart modes to synchronize ambience instantly.</p>
      <div className="mt-6 grid gap-3">
        {commands.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => handleCommand(item.label)}
            className="rounded-3xl border border-slate-700/40 bg-slate-950/70 px-4 py-4 text-left transition hover:border-cyan-400/40"
          >
            <p className="font-semibold text-white">{item.label}</p>
            <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
          </button>
        ))}
      </div>
      <div className="mt-6 rounded-3xl border border-slate-700/40 bg-slate-900/80 p-4 text-slate-300">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Assistant status</p>
        <p className="mt-2 text-base font-medium text-white">{status}</p>
      </div>
    </motion.div>
  );
}

export default VoiceAssistant;
