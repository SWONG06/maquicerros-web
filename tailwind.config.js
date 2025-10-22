/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#f97316', // orange
        secondary: '#374151', // dark gray
        accent: '#ffffff', // white
      },
    },
  },
  plugins: [],
};
