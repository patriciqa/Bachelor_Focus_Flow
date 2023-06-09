/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require('tailwindcss/plugin');

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
    extend: {
      fontFamily: {
        sofiaPro: ["sofia-pro", "sans-serif"],
      }
    },
    fontFamily: {
      sofiaPro: ["sofia-pro", "sans-serif"],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      "break": "#5AB874",
      "study": "#6A65F5",
      "studyChart1": "#332CF2",
      "studyChart2": "#7571F2",
      "studyChart3": "#B5B3F5",
      "breakChart1": "#307B45",
      "breakChart2": "#4CB66A",
      "breakChart3": "#96CDA5",
      'background': '#F9F9F9',
      "inactiveGrey": "#CFCFD9",
      "chartGrey": "#ACAEB1",
      "pieGrey": "#828282",
      "dark": "#333333",



    },
    extend: {
      fontFamily: {
        'nunito': ['nunito', 'sans-serif'],
        'MyFont': ['"My Font"', 'serif'] // Ensure fonts with spaces have " " surrounding it.
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
        h12: ['12px', '12px'],
        h14: ['14px', '14px'],
        h16: ['16px', '16px'],
        h18: ['18px', '18px'],
        h20: ['20px', '20px'],
        h24: ['24px', '24px'],
        h36: ['36px', '36px'],
        // 30: ['30px', '30px'],
      },

    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        'html': { fontSize: "20px" },
      })
    }),
  ],
}



