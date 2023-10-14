import colors from 'tailwindcss/colors';
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
        accent: {
          main: colors.pink[400],
          start: colors.purple[500],
          end: colors.pink[400]
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;
