# How to setup webpack's DllPlugin

WIP

### Important pitfalls:
**If the context of the DllReferencePlugin is not setup correctly it will fail silently!**

The build will pass, vandor.bundle.js will be created successfully, <br>
**but the vendor modules will be included in the user.bundle.js too!**

Make sure that context is referencing to the root of the project.

For example:
* if your config is in the root, use: `__dirname`
* if you config is in a sub folder, like `./configs`, use `path.resolve(__dirname, '..')`

```
new webpack.DllReferencePlugin({
  context: path.resolve(__dirname, '..'),
  manifest: require("../dist/dll/vendor.manifest.json")
})
```


### Debugging
You can use this great tool to visually see what modules were included in your bundles:
https://github.com/danvk/source-map-explorer


### Why HtmlWebpackPlugin?
It's not necessary for the DllPlugin to work.

All it does is injecting bundles to the bottom of `index.html`. <br>
The important part is that both of our bundles needs to be included in the html.

Injecting the scripts from the config will allow our better flexibility in the future.

### Why HtmlWebpackIncludeAssetsPlugin?
That's because `HtmlWebpackPlugin` only concerts about the bundles created by the `webpack.user.js` config, <br>
and doesn't allow us to reference external scripts.
That's what `HtmlWebpackIncludeAssetsPlugin` is for.


----

### The important files

config/webpack.dll.js
```js
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
    new webpack.DllPlugin({
      name: '[name]__[hash]',
      path: path.resolve(__dirname, '../dist/dll/vendor.manifest.json')
    })
  ]
}
```

config/webpack.user.js
```js
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
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Test Webpack's DllPlugin</title>
</head>
<body>
</body>
</html>
```
