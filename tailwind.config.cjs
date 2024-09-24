/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      changa: ['Changa', 'sans-serif'],
      bruno: ["Bruno Ace SC", " sans-serif"]
    },
    extend: {
      boxShadow: {
        'customWinter':'0 10px 30px 0px rgba(40, 36, 36, 0.2)',
        'customDracula': '0 2px 20px 1px rgba(255, 255, 255, 0.2)',
        'boxShadow1': '0 2px 10px 6px rgba(255, 255, 255, 0.2)',
        
      },
      colors: {
        "testi": "#F2EFD0",
        "pohja": "#282A36"
      },
      minHeight: {
        '100' : '32rem'
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
      animation: {
        heartbeat: 'heartbeat 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes:['dracula']
  }
};