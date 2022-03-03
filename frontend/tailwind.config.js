module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        trakCalTheme: {
          primary: '#00897b',
          secondary: '#51ff99',
          accent: '#be123c',
          neutral: '#292524',
          'base-100': '#faf7f5',
          info: '#2D77D7',
          success: '#62DA9C',
          warning: '#Fb8c00',
          error: '#FB1820',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
