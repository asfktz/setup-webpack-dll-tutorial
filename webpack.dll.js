const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    vendor: [
      './src/vendor/letters',
      './src/vendor/numbers'
    ]
  },
  output: {
    filename: 'vendor.bundle.js',
    path: path.resolve(__dirname, 'dll'),
    library: '[name]__[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]__[hash]',
      path: 'dll/vendor.manifest.json'
    })
  ]
}