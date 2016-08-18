var path = require('path');
var webpack = require('webpack');

var assetsPath = path.join(__dirname, "public", "assets");
var publicPath = "assets/";

module.exports = {
  name: 'client',
  entry: [
    './client/app.js'
  ],
  output: {
    path: assetsPath,
    filename: 'client-bundle.js',
    publicPath: publicPath
  },
  watch: true,
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.html/, loader: 'file-loader'
    }, {
      test: /\.js$/,
      include: path.join(__dirname),
      loader: 'babel-loader',
      exclude: /lib/
    }, {
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules|lib/
    }]
  }
};
