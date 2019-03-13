module.exports = ({ options }) => ({
  plugins: {
    'postcss-import': {},
    'tailwindcss': 'tailwind.js',
    'autoprefixer': {},
    'cssnano': options.cssnano
  }
})