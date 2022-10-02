/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.{html,ejs,js', './views/partials/*.{html,ejs,js}'],
  theme: {
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    fontFamily: {
      // sans: ['Roboto', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },

    extend: {
      fontFamily: {
        'comfortaa': ['Comfortaa', 'sans-serif'],
      },

    }
  },
  plugins: [],
}
