module.exports = {
  purge: ['./src/**/*.vue'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
}
