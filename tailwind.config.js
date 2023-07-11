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
          gray: {
            50: '#949494',
          },
          green: {
            100: '#3f9623',
          },
          orange: {
            100: '#ee4d16',
          },
          blue: {
            50: '#F6F7FF',
            100: '#008ea2',
          },
          purple: {
            600: '#52448f',
          },
          yellow: {
            100: '#DACE00',
          },
        },
      },
    },
  },
  plugins: [],
}
