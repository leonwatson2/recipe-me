import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'selector',
  theme: {
    extend: {
      spacing: {
        128: "32rem",
      },
      gridTemplateColumns: {
        "orderedList": "0px 1fr",
        "listEditing": "1fr 40px 40px",
      },
      colors: {
        "primary": "#D1774c",
        "secondary": "#4BD1C3",
        "dark-blue": "#567C78",
        "black": "#332B27",
        "grey": "#524A46",
        "brown": "#a77158",
        "lbrown": "#C29986",
        "white": "#fgfgfg",
        "transparent": "transparent",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "auto-fill": (value) => ({
            gridTemplateColumns: `minmax(12.5rem, 16.5rem) repeat(auto-fill, minmax(min(${value}, 100%), 1fr))`,
          }),
          "auto-fit": (value) => ({
            gridTemplateColumns: `minmax(12.5rem, 16.5rem) repeat(auto-fit, minmax(min(${value}, 100%), 1fr))`,
          }),
        },
        {
          values: theme("width", { 200: "200px" }),
        },
      );
    }),
  ],
};
