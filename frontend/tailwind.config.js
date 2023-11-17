/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './src/styles/custom-fonts.css'],
  theme: {
    extend: {
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
        JetBrains: ['JetBrains', 'monospace'],
      },
      maxWidth: {
        app: '1920px',
      },
      animation: {
        'fade-in-left': 'fadeInLeft 1s ease-in-out',
        'fade-in-flat': 'fadeInFlat 1s ease-in-out',
      },
    },
  },
  plugins: [],
};
