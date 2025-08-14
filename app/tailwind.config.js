/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#FCA311",
          navy: "#000B27",
          gray: "#E5E5E5",
          black: "#000000",
          white: "#FFFFFF",
        },
      },
      borderRadius: { '2xl': '1.25rem' },

      // ⬇️ Add this
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Helvetica", "Arial", "Apple Color Emoji", "Segoe UI Emoji"],
      },
    },
  },
  plugins: [],
};
