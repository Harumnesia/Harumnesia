/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#F5D57A",
        "dark-blue": "#003087",
        "dark-gray": "#252726",
        "light-gray": "#575656",
        black: "#000000",
        white: "#FFFFFF",
        cream: "#FCF8EF",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        inter: ["Inter", "sans-serif"],
        josefin: ["Josefin Sans", "sans-serif"],
      },
      backgroundColor: (theme) => ({
        ...theme("colors"),
      }),
      textColor: (theme) => ({
        ...theme("colors"),
      }),
      borderColor: (theme) => ({
        ...theme("colors"),
      }),
    },
  },
  plugins: [],
};
