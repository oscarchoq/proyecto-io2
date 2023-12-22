/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#15803d',
          500: '#4D7BFF',
          800: '#153C99',
        },
        background: '#f7faf2',
      }
    },
  },
  plugins: [],
}

