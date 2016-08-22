var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
    }]
  },

  postcss: [
    require('autoprefixer'),
    require('postcss-nested')
  ],

  plugins: [
   new ExtractTextPlugin('style.css', { allChunks: true })
  ]
};
