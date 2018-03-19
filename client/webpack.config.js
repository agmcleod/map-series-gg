const path = require('path')
const config = require('config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const distPath = path.join(__dirname, 'dist')
const srcPath = __dirname

module.exports = {
  name: 'client',
  entry: [
    './app.js'
  ],
  output: {
    path: distPath,
    filename: '[name].[hash].bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    outputPath: distPath,
    contentBase: distPath,
    historyApiFallback: true
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: srcPath,
      loaders: ['babel']
    }, {
      test: /\.html/, loader: 'file-loader'
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
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify(config)
    })
  ]
}
