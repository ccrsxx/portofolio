/** @type {import('tailwindcss').Config} */

const { blue } = require('tailwindcss/colors');

module.exports = {
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)']
      },
      colors: {
        background: '#222222',
        'accent-blue': blue[400]
      }
    }
  },
  plugins: []
};
