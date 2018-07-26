// Base
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: [path.resolve('src/main.js'),'webpack-hot-middleware/client'],
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    contentBase: path.resolve('./.tmp'),
    hot:true
  },
  output:{
    publicPath:path.resolve('/')
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
};
