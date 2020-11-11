module.exports = {
  purge: [],
  theme: {
    extend: {
      screens: {
        'portrait': { 'raw': '(orientation: portrait)' },
        'landscape': { 'raw': '(orientation: landscape)' },
      }},
  },
  variants: { backgroundImage: ['responsive', 'hover', 'focus'],},
  plugins: [],
}
