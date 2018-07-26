const postcssflexibility = require('postcss-flexibility');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rucksackcss = require('rucksack-css');
const poststylus = require('poststylus');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  CSS:{
    serve:[
      'vue-style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options:{
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexibility'),
            require('autoprefixer'),
            require('cssnano'),
            require('rucksack-css')
          ]
        }
      },
    ],
    extract:[
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options:{
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexibility'),
            require('autoprefixer'),
            require('cssnano'),
            require('rucksack-css')
          ]
        }
      },
    ]
  },
  STYLUS:{
    serve:[
      'vue-style-loader',
      'css-loader',
      {
        loader:'stylus-loader',
        options:{
          preferPathResolver: 'webpack',
        }
      }
    ],
    extract:[
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader:'stylus-loader',
        options:{
          preferPathResolver: 'webpack',
          use:[
            poststylus(
              [
                'postcss-flexibility',
                'autoprefixer',
                'rucksack-css'
              ]
            )
          ]
        }
      }
    ]
  },
  FILELOADER:{
    serve_options: {
      limit: 10000,
      name: '[name].[hash:7].[ext]',
      publicPath: 'static/fonts/',
      outputPath: 'static/fonts/'
    },
    extract_options: {
      limit: 10000,
      name: '[name].[hash:7].[ext]',
      publicPath: '../../static/fonts/',
      outputPath: 'static/fonts/'
    },
  }
};
