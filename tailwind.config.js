/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#F5D57A",
        "gold-light": "#f8e5a5",
        "gold-dark": "#d4af37",
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
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-subtle": "pulse-subtle 3s infinite ease-in-out",
        "spin-slow": "spin 20s linear infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        fadeInUp: "fadeInUp 0.6s ease-out forwards",
        "shimmer-gold": "shimmer-gold 6s infinite linear",
        "glow-pulse": "glow-pulse 4s infinite ease-in-out",
        "border-glow": "border-glow 3s infinite ease-in-out",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        "pulse-subtle": {
          "0%": { boxShadow: "0 0 15px 2px rgba(245, 213, 122, 0.5)" },
          "50%": { boxShadow: "0 0 20px 4px rgba(245, 213, 122, 0.7)" },
          "100%": { boxShadow: "0 0 15px 2px rgba(245, 213, 122, 0.5)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%) skewX(-12deg)" },
          "100%": { transform: "translateX(200%) skewX(-12deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeInUp: {
          "0%": {
            opacity: 0,
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "shimmer-gold": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "200% 0%" },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 5px 2px rgba(245, 213, 122, 0.3)",
            borderColor: "rgba(245, 213, 122, 0.4)",
          },
          "50%": {
            boxShadow: "0 0 15px 5px rgba(245, 213, 122, 0.6)",
            borderColor: "rgba(245, 213, 122, 0.8)",
          },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(245, 213, 122, 0.4)" },
          "50%": { borderColor: "rgba(245, 213, 122, 0.8)" },
        },
      },
      boxShadow: {
        gold: "0 0 15px 2px rgba(245, 213, 122, 0.6)",
        "gold-lg": "0 0 25px 5px rgba(245, 213, 122, 0.7)",
        "gold-inner": "inset 0 0 10px 1px rgba(245, 213, 122, 0.4)",
        "gold-subtle": "0 0 8px 1px rgba(245, 213, 122, 0.3)",
      },
      textShadow: {
        glow: "0 0 20px rgba(245, 213, 122, 0.5), 0 0 50px rgba(245, 213, 122, 0.3)",
      },
      backgroundColor: (theme) => ({
        ...theme("colors"),
      }),
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gold-shimmer":
          "linear-gradient(90deg, #d4af37, #f5d57a, #f8e5a5, #f5d57a, #d4af37)",
      },
      textColor: (theme) => ({
        ...theme("colors"),
      }),
      borderColor: (theme) => ({
        ...theme("colors"),
      }),
      backgroundSize: {
        "200%": "200% 100%",
      },
    },
  },
  plugins: [],
};
