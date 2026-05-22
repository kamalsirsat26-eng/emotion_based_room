import { useState } from 'react';
import { motion } from 'framer-motion';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import api from '../api';

const initialForm = { name: '', email: '', password: '' };

function LoginPage({ authContext }) {
  const [form, setForm] = useState(initialForm);
  const [mode, setMode] = useState('login');
  const [error, setError] = useState(null);

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
      const path = mode === 'login' ? '/auth/login' : '/auth/register';
      const payload = mode === 'login' ? { email: form.email, password: form.password } : form;
      const response = await api.post(path, payload);
      authContext.setSession({ token: response.data.token, profile: response.data.user });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to authenticate.');
    }
  };

  const handleGoogleSignin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      authContext.setSession({ token: user.uid, profile: { name: user.displayName, email: user.email, avatar: user.photoURL } });
    } catch (err) {
      setError('Google sign-in failed. Ensure Firebase is configured.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full glass-panel p-8 rounded-[2rem] shadow-glow border border-white/10"
      >
        <div className="mb-8">
          <p className="text-cyan-300 uppercase tracking-[0.3em] text-sm mb-3">MoodSync</p>
          <h1 className="text-4xl font-semibold tracking-tight">Emotion-powered smart room access</h1>
          <p className="mt-4 text-slate-300">Sign in and launch your ambient automation system with online room analytics, mode controls and AI mood scouting.</p>
        </div>

        <div className="grid gap-4">
          <button
            type="button"
            onClick={handleGoogleSignin}
            className="group relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-950/80 px-5 py-4 text-left text-white transition hover:border-cyan-400/40 hover:bg-slate-900"
          >
            <span className="block text-sm text-slate-400">Google Sign-In</span>
            <span className="mt-2 block text-lg font-medium">Launch with secure federated login</span>
          </button>

          <div className="relative py-3 text-center text-slate-500">
            <span className="bg-[#060816] px-3">Or use email authentication</span>
          </div>

          <form className="grid gap-4" onSubmit={submit}>
            {mode === 'register' && (
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="Your full name"
                className="rounded-3xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none text-white placeholder:text-slate-500"
              />
            )}
            <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder="Email address"
              className="rounded-3xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none text-white placeholder:text-slate-500"
            />
            <input
              type="password"
              value={form.password}
              onChange={handleChange('password')}
              placeholder="Password"
              className="rounded-3xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none text-white placeholder:text-slate-500"
            />
            {error && <div className="text-sm text-rose-300">{error}</div>}
            <button
              type="submit"
              className="rounded-3xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-3 text-base font-semibold text-slate-950 shadow-glow transition hover:-translate-y-1"
            >
              {mode === 'login' ? 'Continue to MoodSync' : 'Create account'}
            </button>
          </form>

          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>{mode === 'login' ? 'New to MoodSync?' : 'Already have an account?'}</span>
            <button type="button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(null); }} className="font-semibold text-cyan-300 hover:text-cyan-200">
              {mode === 'login' ? 'Create account' : 'Login instead'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
