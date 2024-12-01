module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "#44adee",
        secondary: "#e74689",
        accent: "#fff12e",
        neutral: "#1a1a1a",
        base: {
          100: "#ffffff",
          200: "#f5f5f5",
          300: "#ebebeb",
        },
        "primary-content": "#000000",
        "secondary-content": "#000000",
        "accent-content": "#000000",
        "neutral-content": "#ffffff",
        "base-content": "#000000",
        info: "#4aa8bf",
        success: "#81328f",
        warning: "#ed7f31",
        error: "#e83d30",
        poke: {
          normal: "#A8A878",
          fire: "#F08030",
          water: "#6890F0",
          electric: "#F8D030",
          grass: "#78C850",
          ice: "#98D8D8",
          fighting: "#C03028",
          poison: "#A040A0",
          ground: "#E0C068",
          flying: "#A890F0",
          psychic: "#F85888",
          bug: "#A8B820",
          rock: "#B8A038",
          ghost: "#705898",
          dragon: "#7038F8",
          dark: "#705848",
          steel: "#B8B8D0",
          fairy: "#EE99AC",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
