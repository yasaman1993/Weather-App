/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/*.jsx",
     "./src/App.jsx"
    ],
  theme: {
    extend: {
      
      colors: {
        'primary': '#4a90e2',
        'secondary': '#50e3c2',
        'error': '#f5a623',
      },
      backgroundImage: {
        'sky': "url('../public/backgrounds/blusky-bg.jpg')",
      },
    },
  },
  plugins: [],
}
