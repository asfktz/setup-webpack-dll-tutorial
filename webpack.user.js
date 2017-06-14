const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'user.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./dll/vendor.manifest.json"),
    })
  ]
}