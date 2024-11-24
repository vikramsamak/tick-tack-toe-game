/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark", "light"], // Ensure both themes are available
  },
};
