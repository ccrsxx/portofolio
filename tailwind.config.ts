import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)']
      },
      colors: {
        'accent-blue': '#60a5fa'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;
