import { useState } from 'react';
import { motion } from 'framer-motion';

function DeviceSimulator({ deviceState, setDeviceState, accent }) {
  const [slider, setSlider] = useState(deviceState.temperature);

  return (
    <div className="glass-panel rounded-[2rem] border border-slate-700/40 p-6 shadow-glow">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-cyan-300 uppercase tracking-[0.3em] text-xs">IoT dashboard</p>
          <h3 className="mt-3 text-2xl font-semibold">Smart device simulation</h3>
        </div>
        <span className="text-sm text-slate-400">Realtime room status</span>
      </div>
      <div className="mt-6 grid gap-4">
        <div className="grid gap-3 rounded-3xl border border-slate-700/40 bg-slate-950/70 p-4">
          <div className="flex items-center justify-between text-slate-300">
            <span>Smart bulb</span>
            <span>{deviceState.bulb.brightness}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-800">
            <div className="h-full rounded-full" style={{ width: `${deviceState.bulb.brightness}%`, background: accent }} />
          </div>
          <div className="rounded-3xl bg-slate-900/90 p-3 text-slate-300">Color code: {deviceState.bulb.color}</div>
        </div>

        <div className="grid gap-3 rounded-3xl border border-slate-700/40 bg-slate-950/70 p-4">
          <div className="flex items-center justify-between text-slate-300">
            <span>AC & fan</span>
            <span>{slider}°C</span>
          </div>
          <input
            type="range"
            min="16"
            max="28"
            value={slider}
            onChange={(event) => setSlider(Number(event.target.value))}
            onMouseUp={() => setDeviceState((prev) => ({ ...prev, temperature: slider }))}
            className="h-2 w-full cursor-pointer accent-cyan-400"
          />
          <div className="rounded-3xl bg-slate-900/90 p-3 text-slate-300">Fan speed: {['Low', 'Medium', 'High'][deviceState.fan - 1]}</div>
        </div>

        <div className="grid gap-3 rounded-3xl border border-slate-700/40 bg-slate-950/70 p-4">
          <div className="flex items-center justify-between text-slate-300">
            <span>Speaker</span>
            <span>{deviceState.moodMode}</span>
          </div>
          <div className="rounded-3xl bg-slate-900/90 p-4 text-slate-300">Volume control, playlist automation, immersive ambience.</div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          onClick={() => setDeviceState((prev) => ({ ...prev, bulb: { ...prev.bulb, brightness: prev.bulb.brightness > 80 ? 46 : 86 } }))}
          className="rounded-3xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-glow"
        >
          Toggle Brightness Pulse
        </motion.button>
      </div>
    </div>
  );
}

export default DeviceSimulator;
