/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: '#0A0A0A',
        glass: 'rgba(255, 255, 255, 0.06)',
        'glass-border': 'rgba(255, 255, 255, 0.08)',
        violet: '#7C3AED',
        'violet-deep': '#5B21B6',
        crimson: '#991B1B',
        'crimson-deep': '#7F1D1D',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        glass: '12px',
        'glass-strong': '20px',
      },
      backgroundImage: {
        'ink-bleed': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124, 58, 237, 0.25), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(153, 27, 27, 0.15), transparent), radial-gradient(ellipse 50% 30% at 0% 80%, rgba(124, 58, 237, 0.12), transparent)',
      },
    },
  },
  plugins: [],
}
