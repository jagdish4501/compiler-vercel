/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mainBg: '#1e1e1e',
        darkBg: '#111',
        brand: '#6674CC',
        brand100: '#6452FE',
        brand300: '#4E5DC0',
        brColor: '#7985D2',
        section_bg: '#F7F8FC',
        yellow500: '#FF9E2A',
        headText: '#011229',
        subText: '#777C85',
        HeroSubText: '#E1E2E4',
        textpara: '#4A4F5C',
        purple100: '#F1E4FF',
        purple500: '#b578ff',
        nevyBlue: '#042A57',
        grey50: '#EDEDED',
        grey80: '#C2C2C2',
        grey100: '#A6A6A6',
        white100: '#EBEFFF',
        grassGreen: '#1DD1A1',
        textHead: '#363A45',
        fruitboxColor1: '#1B2430',
        fruitboxColor2: '#86ED26',
        compiler: {
          bg1: '#161E2E',
          bg2: '#27303F',
          txt1: '#475569',
          txt2: '#CFD8E3',
          txt3: '#64748B',
        },
      },
      fontFamily: {
        fredoka: 'Fredoka One, cursive',
        raleway: 'Raleway, sans-serif',
        rubik: 'Rubik, sans-serif',
      },
    },
  },
  plugins: [],
};
