var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var assetsPath = path.join(__dirname, 'public', 'assets');
var publicPath = 'assets/';

module.exports = {
  name: 'client',
  entry: [
    './client/app.ts'
  ],
  output: {
    path: assetsPath,
    filename: 'client-bundle.js',
    publicPath: publicPath
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['', '.ts', '.tsx', '.js']
  },
  watch: true,
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.html/, loader: 'file-loader'
    }, {
      test: /\.tsx?$/,
      loader: "ts-loader"
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
    }],
    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  postcss: [
    require('autoprefixer'),
    require('postcss-nested')
  ],

  plugins: [
   new ExtractTextPlugin('style.css', { allChunks: true })
  ]
};
