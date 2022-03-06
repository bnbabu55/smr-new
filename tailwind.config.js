module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./content/**/*.{js,jsx,ts,tsx,html,md,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        22: ["22px", "30px"],
      },
      letterSpacing: {
        wider2xl: ".25em",
      },
      colors: {
        themeBlue: {
          200: "#028bf3",
          300: "#0169b8",
          400: "#015ea5",
          500: "#01487e",
          600: "#013d6b",
          700: "#013257",
          800: "#001c30",
        },
        themeOrange: {
          100: "#FFEC19",
          200: "#ffa800",
          300: "#fc9902",
          400: "#b95e02",
          700: "#7c3f02",
        },
        themeYellow: {
          400: "#ed950d",
        },
        facebookBlue: "#4267B2",
        linkedInBlue: "#0072b1",
      },
      listStyleType: {
        tickmark: "✓",
      },
    },
  },

  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
}
