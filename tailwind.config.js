/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'beige': {
          'bg': '#f5f5dc',
          'soft': '#e8e6d4',
          'border': '#dcd9c3',
        },
        'brown': {
          'text': '#4a4238',
          'muted': '#8a7e6f',
        },
        'accent': {
          'primary': '#00c6ff',
          'primary-hover': '#0fa',
        }
      },
      fontFamily: {
        // Set Mori as the default sans-serif font
        sans: ['Mori', 'sans-serif'],
        // You can keep a display font if you wish
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}