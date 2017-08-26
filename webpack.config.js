const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
  entry: './web/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      {test: /\.txt$/, use: 'raw-loader'}
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};

module.exports = config;
