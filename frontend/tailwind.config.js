export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 35px rgba(56, 189, 248, 0.15), 0 12px 40px rgba(15, 23, 42, 0.3)'
      },
      colors: {
        obsidian: '#060816',
        neon: '#39f7ff',
        midnight: '#0b1221'
      },
      backgroundImage: {
        glass: 'radial-gradient(circle at top left, rgba(56,189,248,0.18), transparent 40%), radial-gradient(circle at bottom right, rgba(168,85,247,0.14), transparent 35%)'
      }
    }
  },
  plugins: []
};
