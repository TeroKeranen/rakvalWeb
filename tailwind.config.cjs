/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'customWinter':'0 10px 30px 0px rgba(40, 36, 36, 0.2)',
        'customDracula': '0 20px 40px 1px rgba(255, 255, 255, 0.2)',
        
      }
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes:['winter', 'dracula']
  }
};