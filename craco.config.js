const path = require('path')
module.exports = {
  webpack: {
    alias: {
      '@contracts': path.normalize(
        path.resolve(__dirname, 'src', 'generated', 'contracts', 'typechain')
      ),
      '@src': path.normalize(path.resolve(__dirname, 'src')),
    },
  },
}
