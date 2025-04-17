/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#0D0D0D',
        'cyber-dark': '#1A1A2E',
        'cyber-blue': '#00FFFF',
        'cyber-purple': '#BF00FF',
        'cyber-pink': '#FF00FF',
        'cyber-yellow': '#FFFF00',
        'cyber-red': '#FF003C',
        'cyber-green': '#00FF9F',
        'neon-blue': '#00F0FF',
        'neon-purple': '#BD00FF',
        'grid-blue': 'rgba(0, 240, 255, 0.5)',
        'mars-red': '#C34517',
        'mars-orange': '#E85D04',
        'mars-dust': '#FFBA08',
        'mars-brown': '#55423D',
        'mars-tan': '#D4A373',
      },
      fontFamily: {
        'cyber': ['"Orbitron"', 'sans-serif'],
        'glitch': ['"Press Start 2P"', 'cursive'],
        'futuristic': ['"Rajdhani"', 'sans-serif'],
        'mars': ['"Exo 2"', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 5px #00F0FF, 0 0 10px #00F0FF',
        'neon-purple': '0 0 5px #BD00FF, 0 0 10px #BD00FF',
        'neon-pink': '0 0 5px #FF00FF, 0 0 10px #FF00FF',
        'mars-glow': '0 0 8px rgba(232, 93, 4, 0.6)',
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'scan-line': 'scanline 6s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'fadeOut': 'fadeOut 1.5s ease-in-out forwards',
        'scaleIn': 'scaleIn 0.5s ease-in-out',
        'dust-float': 'dustFloat 15s linear infinite',
        'mars-hover': 'marsHover 3s ease-in-out infinite',
        'petal-flutter': 'petalFlutter 2s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-5px, 5px)' },
          '40%': { transform: 'translate(-5px, -5px)' },
          '60%': { transform: 'translate(5px, 5px)' },
          '80%': { transform: 'translate(5px, -5px)' },
        },
        scanline: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        glowPulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        dustFloat: {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-15px) translateX(15px)' },
          '100%': { transform: 'translateY(0) translateX(0)' },
        },
        marsHover: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(3deg)' },
        },
        petalFlutter: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'scale(1.05) rotate(2deg)' },
          '75%': { transform: 'scale(0.95) rotate(-2deg)' },
        },
      },
      animationDelay: {
        '200': '200ms',
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    function ({ addUtilities, theme }) {
      const animationDelays = theme('animationDelay', {});
      const utilities = Object.entries(animationDelays).map(([key, value]) => ({
        [`.animation-delay-${key}`]: { animationDelay: value },
      }));

      addUtilities(utilities);
    },
  ],
} 