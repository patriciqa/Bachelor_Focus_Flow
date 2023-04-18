const defaultTheme = require("tailwindcss/defaultTheme")
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./component/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
    },
    extend: {
      fontFamily: {
        sans: [
          '"Source Sans 3Variable"',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      fontSize: {
        h1: ['2.625rem', '1.2'], // 42px
        h2: ['1.625rem', '1.2'], // 26px
        h3: ['1.125rem', '1.4'], // 18px
        h4: ['1rem', '1.6'], // 16px
        h5: ['0.875rem', '1.4'], // 14px
        cm: ['1.25rem', '1.6'], // 20px
        cs: ['1.125rem', '1.5'], // 18px
        cxs: ['1rem', '1.6'], // 16px
        cxxs: ['0.875rem', '1.5'], // 14px
      },

    },
  },
  plugins: [],
}

