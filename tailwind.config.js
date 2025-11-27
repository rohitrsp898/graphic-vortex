/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6d28d9',
      },
      fontFamily: {
        poppins: ['"Poppins"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Outfit"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}