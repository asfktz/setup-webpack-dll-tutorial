const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'user.bundle.js',
    path: path.resolve(__dirname, '..', 'dist')
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '..'),
      manifest: require("../dist/dll/vendor.manifest.json")
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '..', 'index.html'),
    }),
    
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['dll/vendor.bundle.js'],
      append: false
    })
  ]
}