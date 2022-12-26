/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)']
      },
      colors: {
        'dark-background': '#222222',
        'accent-blue': '#60a5fa'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
