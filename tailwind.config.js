module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './assets/**/*.svg',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: '#16a085', // seagreen-400
        primaryLight: '',
        secondaryLight: '',
        primaryDark: '',
        secondaryDark: '',
        primaryLightTxt: '',
        secondaryLightTxt: '',
        primaryDarkTxt: '',
        secondaryDarkTxt: '',
        seagreen: {
          50: '#edf5f3',
          100: '#cbf0f0',
          200: '#90e8dc',
          300: '#55cfb5',
          400: '#16a085',
          500: '#14995e',
          600: '#138447',
          700: '#136639',
          800: '#0e462c',
          900: '#0a2b23',
        },
        denim: {
          50: '#f5f8fa',
          100: '#def0fb',
          200: '#b9def7',
          300: '#89beea',
          400: '#5899d9',
          500: '#4376ca',
          600: '#385bb4',
          700: '#2d4491',
          800: '#202e68',
          900: '#131d43',
        },
        royalblue: {
          50: '#f6f9fb',
          100: '#e2f0fc',
          200: '#c2dbf9',
          300: '#97b9ef',
          400: '#6d92e3',
          500: '#566ed8',
          600: '#4752c7',
          700: '#373ea4',
          800: '#262a77',
          900: '#161a4b',
        },
        orchid: {
          50: '#f8fafb',
          100: '#ecf0fb',
          200: '#d7d7f8',
          300: '#b5b2ec',
          400: '#9988df',
          500: '#8064d3',
          600: '#6947bf',
          700: '#4f369b',
          800: '#36256e',
          900: '#1f1742',
        },
        violet: {
          50: '#fafafb',
          100: '#f2f0f9',
          200: '#e5d4f4',
          300: '#cbade5',
          400: '#ba81d3',
          500: '#a25cc3',
          600: '#8741aa',
          700: '#653184',
          800: '#46225a',
          900: '#281534',
        },
        blush: {
          50: '#fcfcfb',
          100: '#faf0f0',
          200: '#f6cfe0',
          300: '#eaa3c0',
          400: '#e6749a',
          500: '#d7507b',
          600: '#bf365b',
          700: '#972842',
          800: '#6c1c2b',
          900: '#411218',
        },
        sunset: {
          50: '#fcfbfa',
          100: '#fbf0e7',
          200: '#f6d2cd',
          300: '#eaa7a2',
          400: '#e37875',
          500: '#d35551',
          600: '#b93b38',
          700: '#912c2a',
          800: '#671e1d',
          900: '#3f1311',
        },
        chocolate: {
          50: '#fcfbf7',
          100: '#faf0d5',
          200: '#f4d8aa',
          300: '#e4b076',
          400: '#d38349',
          500: '#bc612a',
          600: '#9e471b',
          700: '#793517',
          800: '#542511',
          900: '#35170c',
        },
        olive: {
          50: '#fafaf4',
          100: '#f7f0c4',
          200: '#eede8c',
          300: '#d4bb58',
          400: '#af9130',
          500: '#8e7219',
          600: '#725910',
          700: '#58420e',
          800: '#3c2d0c',
          900: '#271c09',
        },
        asparagus: {
          50: '#f8f8f4',
          100: '#f0f0d8',
          200: '#dce2ac',
          300: '#b2c277',
          400: '#759d48',
          500: '#567f28',
          600: '#45671b',
          700: '#374e18',
          800: '#263513',
          900: '#1a200f',
        },
      },
      animation: {
        spin: 'spin 2s linear infinite',
      },
      scale: {
        101: '1.01',
      },
      transitionProperty: {
        height: 'height',

        spacing: 'margin, padding',
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus'],
      zIndex: ['hover', 'active'],
      ringWidth: ['hover', 'active'],
      transitionProperty: ['responsive'],
      transform: ['hover', 'focus'],
      visibility: ['hover', 'focus'],
      display: ['hover'],
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    // require('tailwindcss-textshadow'),
    // require('tailwind-hamburgers'),
    // require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
