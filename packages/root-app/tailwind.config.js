module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "inherit",
            " p": {
              color: "inherit",
            },
            "h1, h2, h3, h4, h5, h6": {
              color: "inherit",
            },
            strong: {
              color: "inherit",
              fontWeight: "bold",
            },
          },
        },
      },
      gridTemplateColumns: {
        fit: "repeat(auto-fit, 18rem)",
        calendar: "repeat(7, 1fr)",
      },
      gridTemplateRows: {
        min: "min-content",
      },
      height: {
        big: "90%",
        full: "100%",
      },
      animation: {
        "spin-fast": "spin 0.7s linear infinite",
      },
      colors: {
        "dark-main": "#18191A",
        "dark-second": "#242526",
        "dark-third": "#3A3B3C",
        "dark-txt": "#B8BBBF",
        dim: {
          50: "#5F99F7",
          100: "#5F99F7",
          200: "#38444d",
          300: "#202e3a",
          400: "#253341",
          500: "#5F99F7",
          600: "#5F99F7",
          700: "#192734",
          800: "#162d40",
          900: "#15202b",
        },
      },
      width: {
        68: "68px",
        88: "88px",
        275: "275px",
        290: "290px",
        350: "350px",
        600: "600px",
      },
      screens: {
        xs: "614px",
        sm: "1002px",
        md: "1022px",
        lg: "1092px",
        xl: "1280px",
      },
    },
  },

  variants: {
    extend: {
      display: ["group-hover"],
      transform: ["group-hover"],
      scale: ["group-hover"],
    },
  },
  plugins: [],
};
