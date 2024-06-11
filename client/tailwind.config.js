/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#001F3F",
        hover: "#001737",
        secondary: "#E0F2FF",
        accent: "#4CAF50",
      },
      keyframes: {
        pingCustom: {
          "0%": { transform: "scale(0.5)", opacity: "1" },
          "75%, 100%": { transform: "scale(1)" }, // Adjust the opacity to your preference
        },
      },
      animation: {
        "ping-custom": "pingCustom 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};