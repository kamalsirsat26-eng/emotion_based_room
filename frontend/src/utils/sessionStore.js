export const loadSession = () => {
  try {
    const raw = localStorage.getItem('moodsync_session');
    return raw ? JSON.parse(raw) : { token: null, profile: null };
  } catch {
    return { token: null, profile: null };
  }
};

export const saveSession = (session) => {
  localStorage.setItem('moodsync_session', JSON.stringify(session));
  if (session?.token) {
    localStorage.setItem('moodsync_token', session.token);
  } else {
    localStorage.removeItem('moodsync_token');
  }
};
