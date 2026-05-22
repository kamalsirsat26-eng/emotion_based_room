import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from 'recharts';

function MoodHistoryChart({ data = [], themeColor = '#34d399' }) {
  const chartData = data.map((item, index) => ({ name: item.time, value: Math.round(item.confidence) || 60, emotion: item.emotion }));

  return (
    <div className="mt-6 h-[320px] min-h-[320px] w-full rounded-[1.8rem] bg-slate-950/70 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Mood timeline</p>
        <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs text-slate-300">Live analytics</span>
      </div>
      <div className="mt-4 h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={themeColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={themeColor} stopOpacity={0.08} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="5 5" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', borderRadius: '18px', color: '#ffffff' }} />
            <Area type="monotone" dataKey="value" stroke={themeColor} fill="url(#colorMood)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MoodHistoryChart;
