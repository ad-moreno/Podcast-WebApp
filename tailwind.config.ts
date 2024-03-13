import {type Config} from 'tailwindcss';
import {fontFamily} from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: '#0369a1',
        secondary: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Lato', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
