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
    // fontFamily: {
    //   sofiaPro: ['Sofia Pro', 'sans-serif'],
    // },
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
      "active": '#333333',

      "darkGrey": "#959494",
      "breakGreen": "#48B065",
      "studyBlue": "#5A55F4",
      "opposite": "#48B065",
      "break": "#48B065",
      "study": "#5A55F4",
      "studyChart1": "#332CF2",
      "studyChart2": "#7571F2",
      "studyChart3": "#B5B3F5",
      "breakChart1": "#307B45",
      "breakChart2": "#4CB66A",
      "breakChart3": "#96CDA5",
      'background': '#F9F9F9',
      'lightBlue': 'E5F0FF',
      "inactiveGrey": "#CFCFD9",
      "chartGrey": "#C0C3C8",
      "pieGrey": "#828282",
      "dark": "#333333",



    },
    extend: {
      fontFamily: {
        sans: ["Sofia Pro", ...defaultTheme.fontFamily.sans],
      },
      // fontFamily: {
      //   sofiaPro: ['Sofia Pro', 'sans-serif'],
      //   // fontFamily: {
      //   //   sans: [
      //   //     '"Source Sans 3Variable"',
      //   //     ...defaultTheme.fontFamily.sans,
      //   //   ],
      // },
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



