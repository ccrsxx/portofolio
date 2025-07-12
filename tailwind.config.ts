import colors from 'tailwindcss/colors';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
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
  plugins: [typography]
} satisfies Config;
