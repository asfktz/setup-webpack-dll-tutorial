const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    vendor: [
      'lodash'
    ]
  },
  output: {
    filename: 'vendor.bundle.js',
    path: path.resolve(__dirname, '../dist/dll'),
    library: '[name]__[hash]'
  },
  plugins: [
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DllPlugin({
      name: '[name]__[hash]',
      path: path.resolve(__dirname, '../dist/dll/vendor.manifest.json')
    })
  ]
}