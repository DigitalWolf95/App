const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#d5df26', // main
          foreground: '#212121', // contrastText
        },
        secondary: {
          DEFAULT: '#00BCD4',
          foreground: '#212121',
        },
      },
    },
  },
  plugins: [],
};
