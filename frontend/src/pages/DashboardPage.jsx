import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiSlidersHorizontal, FiBell, FiPower, FiArrowRight, FiPlayCircle, FiMusic } from 'react-icons/fi';
import api from '../api';
import useFaceApi from '../hooks/useFaceApi';
import { emotionTheme } from '../utils/moodMappings';
import { recommendations } from '../data/recommendations';
import MoodHistoryChart from '../components/MoodHistoryChart';
import SmartModeGrid from '../components/SmartModeGrid';
import DeviceSimulator from '../components/DeviceSimulator';
import MusicPlayer from '../components/MusicPlayer';
import VoiceAssistant from '../components/VoiceAssistant';
import HeatmapPanel from '../components/HeatmapPanel';

function DashboardPage({ authContext }) {
  const videoRef = useRef(null);
  const [webcamReady, setWebcamReady] = useState(false);
  const [themeState, setThemeState] = useState(emotionTheme.Neutral);
  const [moodHistory, setMoodHistory] = useState([]);
  const [deviceState, setDeviceState] = useState({ bulb: { color: '#5b93ff', brightness: 72 }, temperature: 22, fan: 3, moodMode: 'Aura Sync' });
  const [recommendation, setRecommendation] = useState(recommendations.motivation[0]);
  const [activeMode, setActiveMode] = useState('Meditation Mode');
  const { status, emotionResult } = useFaceApi(videoRef);

  const profile = authContext.session?.profile || { name: 'Guest', email: '' };

  const updateMood = async ({ emotion, confidence }) => {
    const mapped = emotionTheme[emotion] || emotionTheme.Neutral;
    setThemeState(mapped);
    setRecommendation(
      recommendations[
        emotion === 'Happy' ? 'motivation' : emotion === 'Sad' ? 'relaxation' : emotion === 'Angry' ? 'breathing' : emotion === 'Relaxed' ? 'relaxation' : 'productivity'
      ][Math.floor(Math.random() * 3)]
    );
    setDeviceState((prev) => ({
      ...prev,
      bulb: { color: mapped.color, brightness: emotion === 'Sad' ? 56 : emotion === 'Happy' ? 88 : 70 },
      temperature: emotion === 'Angry' ? 19 : emotion === 'Relaxed' ? 22 : 21,
      moodMode: `${mapped.label} Flow`
    }));
    if (authContext.session?.token) {
      try {
        await api.post('/mood/log', {
          emotion,
          confidence,
          energyLevel: Math.round(confidence / 10)
        });
      } catch (error) {
        console.warn('Mood log failed', error);
      }
    }
  };

  useEffect(() => {
    if (emotionResult?.emotion) {
      updateMood(emotionResult);
      setMoodHistory((prev) => [
        { id: prev.length + 1, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), ...emotionResult },
        ...prev.slice(0, 8)
      ]);
    }
  }, [emotionResult]);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setWebcamReady(true);
        }
      } catch (error) {
        console.warn('Webcam unavailable', error);
      }
    };
    getVideo();
  }, []);

  const moodCards = useMemo(
    () => [
      { title: 'Weekly mood trend', value: `${Math.round(Math.random() * 20 + 68)}%`, status: 'Stable' },
      { title: 'Stress alerts', value: `${Math.round(Math.random() * 8 + 2)}`, status: 'Today' },
      { title: 'Energy forecast', value: `${Math.round(Math.random() * 25 + 60)}%`, status: 'Balanced' },
      { title: 'Sleep prediction', value: 'Good', status: '7h 43m' }
    ], []);

  return (
    <div className="min-h-screen px-6 py-6 xl:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 lg:grid-cols-[1.3fr_0.95fr]"
      >
        <section className="space-y-6">
          <div className="glass-panel rounded-[2rem] border border-slate-700/40 p-6 shadow-glow">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-cyan-300 uppercase tracking-[0.3em] text-xs">Futuristic command center</p>
                <h2 className="mt-4 text-3xl font-semibold">Good evening, {profile.name.split(' ')[0] || 'Commander'}</h2>
                <p className="mt-2 max-w-xl text-slate-300">MoodSync is monitoring your ambiance and optimizing your room with emotion-driven energy, visuals and smart controls.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="glass-panel rounded-3xl border border-slate-700/30 p-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Live emotion</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{emotionResult.emotion}</p>
                  <p className="mt-2 text-slate-400">Confidence {Math.round(emotionResult.confidence)}%</p>
                </div>
                <div className="glass-panel rounded-3xl border border-slate-700/30 p-4 bg-slate-950/50">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Automation mode</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{deviceState.moodMode}</p>
                  <p className="mt-2 text-slate-400">Current smart scene mapped to your emotion.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.8fr_0.5fr]">
            <div className="glass-panel overflow-hidden rounded-[2rem] border border-slate-700/40 shadow-glow">
              <div className="relative p-6">
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-cyan-500/30 to-transparent" />
                <p className="relative text-sm uppercase tracking-[0.3em] text-cyan-300">Live AI scan</p>
                <h3 className="relative mt-4 text-2xl font-semibold">Webcam mood feed</h3>
                <p className="relative mt-3 text-slate-300">Real-time emotion detection powers lighting, music and relaxation recommendations.</p>
                <div className="relative mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/80">
                  <video ref={videoRef} muted className="h-72 w-full object-cover" />
                  {!webcamReady && <div className="absolute inset-0 grid place-items-center bg-slate-950/70 text-slate-200">Enabling webcam...</div>}
                  <div className="absolute bottom-4 left-4 rounded-3xl bg-slate-950/85 px-4 py-3 text-slate-100 backdrop-blur">
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Status</span>
                    <p className="mt-2 text-sm font-medium">{status}</p>
                  </div>
                </div>
              </div>
            </div>
            <VoiceAssistant activeMode={activeMode} setMode={setActiveMode} />
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.9fr_0.7fr]">
            <div className="glass-panel rounded-[2rem] border border-slate-700/40 p-6 shadow-glow">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-cyan-300 uppercase tracking-[0.3em] text-xs">Mood snapshot</p>
                  <h3 className="mt-3 text-2xl font-semibold">Emotion performance</h3>
                </div>
                <div className="rounded-3xl bg-slate-950/70 px-4 py-2 text-sm text-slate-300">Mode: {activeMode}</div>
              </div>
              <MoodHistoryChart data={moodHistory} themeColor={themeState.color} />
            </div>
            <HeatmapPanel emotion={emotionResult.emotion} accent={themeState.accent} />
          </div>
        </section>

        <aside className="space-y-6">
          <div className="glass-panel rounded-[2rem] border border-slate-700/40 p-6 shadow-glow">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-cyan-300 uppercase tracking-[0.3em] text-xs">Smart room telemetry</p>
                <h3 className="mt-3 text-2xl font-semibold">Environment controls</h3>
              </div>
              <button onClick={() => authContext.setSession({ token: null, profile: null })} className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/50">
                Sign out
              </button>
            </div>
            <div className="mt-6 grid gap-4">
              {moodCards.map((card) => (
                <div key={card.title} className="rounded-3xl border border-slate-700/40 bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">{card.title}</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{card.value}</p>
                  <p className="mt-2 text-sm text-slate-400">{card.status}</p>
                </div>
              ))}
            </div>
          </div>

          <SmartModeGrid selectedMode={activeMode} onSelect={setActiveMode} themeColor={themeState.color} />

          <DeviceSimulator deviceState={deviceState} setDeviceState={setDeviceState} accent={themeState.accent} />

          <div className="glass-panel rounded-[2rem] border border-slate-700/40 p-6 shadow-glow">
            <div className="flex items-center gap-3 text-slate-200">
              <FiMusic className="h-6 w-6 text-cyan-300" />
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Ambient playlist</p>
                <p className="mt-2 text-xl font-semibold">{themeState.playlist}</p>
              </div>
            </div>
            <MusicPlayer mood={emotionResult.emotion} emotionColor={themeState.color} />
          </div>

          <div className="glass-panel rounded-[2rem] border border-slate-700/40 p-6 shadow-glow">
            <p className="text-cyan-300 uppercase tracking-[0.3em] text-xs">AI recommendation</p>
            <h3 className="mt-3 text-2xl font-semibold">Your next focus</h3>
            <p className="mt-4 text-slate-300">{recommendation}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-slate-700/50 px-3 py-2 text-sm text-slate-300">Breathing</span>
              <span className="rounded-full border border-slate-700/50 px-3 py-2 text-sm text-slate-300">Ambient audio</span>
              <span className="rounded-full border border-slate-700/50 px-3 py-2 text-sm text-slate-300">Energy balance</span>
            </div>
          </div>
        </aside>
      </motion.div>
    </div>
  );
}

export default DashboardPage;
