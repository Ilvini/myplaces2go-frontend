/** @type {import('tailwindcss').Config} */
const { join } = require('path')

module.exports = {
  content: [
    join(__dirname, './pages/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, './src/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: {
            200: '#F05966',
            500: '#DC2C3B'
          },

          gray: {
            400: '#A8A8A8',
            500: '#9B9B9B',
            600: '#595959',
            900: '#393939'
          },

          green: {
            300: '#528FA7',
            600: '#33525e',
            400: '#5EC292'
          },
          orange: {
            100: '#ee4d16',
          },
          blue: {
            50: '#F6F7FF',
            100: '#008ea2',
            800: '#12238A',
          },
          purple: {
            600: '#52448f',
          },
          yellow: {
            300: '#F2C05F',
          },
        },
      },
    },
  },
  plugins: [],
}
