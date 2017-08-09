const path = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const assetsPath = path.join(__dirname, 'public', 'assets')
const publicPath = 'assets/'

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
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
