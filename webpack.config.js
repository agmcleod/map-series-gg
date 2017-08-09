const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const assetsPath = path.join(__dirname, 'public', 'assets')
const publicPath = 'assets/'
const srcPath = path.join(__dirname, 'client')

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
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
}
