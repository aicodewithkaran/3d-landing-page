/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sony: {
          bg: "#050505",
          card: "#0A0A0C",
          surface: "#121216",
          border: "rgba(255, 255, 255, 0.08)",
          blue: "#0050FF",
          cyan: "#00D6FF",
          glow: "rgba(0, 214, 255, 0.15)",
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(ellipse at center, rgba(0, 80, 255, 0.12) 0%, rgba(5, 5, 5, 0) 70%)',
        'glow-cyan': 'radial-gradient(circle at center, rgba(0, 214, 255, 0.2) 0%, transparent 60%)',
        'accent-gradient': 'linear-gradient(135deg, #0050FF 0%, #00D6FF 100%)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s infinite ease-in-out',
        'float-slow': 'floatSlow 6s infinite ease-in-out',
      }
    },
  },
  plugins: [],
}
