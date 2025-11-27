/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // 🎨 Colores corporativos Maquicerros
        primary: "#F6C400",      // Amarillo principal
        primaryLight: "#FFD83B", // Hover amarillo
        blackMain: "#0D0D0D",    // Fondo principal
        blackSoft: "#1A1A1A",    // Superficies
        blackMid: "#2C2C2C",     // Bordes/sombras suaves
        grayText: "#EAEAEA",     // Texto gris claro
      },

      boxShadow: {
        yellow: "0 0 15px rgba(246, 196, 0, 0.45)", // Glow amarillo industrial
      },

      fontFamily: {
        // Opcional: fuente más robusta estilo ferretería
        sans: ["Inter", "system-ui"],
        display: ["Anton", "Impact", "Arial Black", "sans-serif"],
      },
    },
  },

  plugins: [],
};
