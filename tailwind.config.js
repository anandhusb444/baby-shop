/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueberry: {
          50: '#f2f6ff',
          100: '#d9e4ff',
          200: '#a6c1ff',
          300: '#739dff',
          400: '#5079ff',
          500: '#2d55ff',
          600: '#2749e6',
          700: '#1d3d99',
          800: '#142c73',
          900: '#0d1d4d',
        },
      },
    },
  },
  plugins: [],
};
