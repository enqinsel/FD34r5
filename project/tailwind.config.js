/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      screens: {
        lg: '1140px',
        xl: '1140px',
        '2xl': '1140px',
      },
    fontSize: {
      'xl' : '64px'
    }
    },
    extend: {
      fontFamily: {
        gemunu: ['Gemunu Libre', 'sans-serif'],
        open: ['Open Sans', 'sans-serif']
      },
      colors: {
        'gega-red': '#BC1A45',
        'gega-melon': '#FFD369',
        'gega-grey': '#DDDDDD',
        'gega-white': '#F7F7F7',
        'input': '#F4F4FF',
        'border-vio': '#6251dd',
        'card': '#F4F4FF',
        'price': '#6251DD'
      },
      spacing: {
        '128': '32rem',
      },
      padding: {
        150 : "150px",
      }
    },
  },
  plugins: [],
}