import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiZap, FiMusic, FiHeart } from 'react-icons/fi';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { loadSession, saveSession } from './utils/sessionStore';

function App() {
  const [session, setSession] = useState(() => loadSession());

  useEffect(() => {
    saveSession(session);
  }, [session]);

  const authContext = useMemo(() => ({ session, setSession }), [session]);

  return (
    <BrowserRouter>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),transparent_18%),radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.12),transparent_22%),bg-[#060816]] text-white"
      >
        <Routes>
          <Route path="/login" element={<LoginPage authContext={authContext} />} />
          <Route
            path="/*"
            element={session?.token ? <DashboardPage authContext={authContext} /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </motion.div>
    </BrowserRouter>
  );
}

export default App;
