const path = require('path');
const config = require('./config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const webpack = require('webpack');
const merge = require('webpack-merge')

const postcssflexibility = require('postcss-flexibility');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rucksackcss = require('rucksack-css');
const poststylus = require('poststylus');

// Plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// module.exports = {
var Webpack_Common_Config = {
  resolve: {
    modules: [path.resolve('./node_modules')],
    alias: {
      Configs: path.resolve('webpack'),
      '@': path.resolve('src'),
      'vue$': 'vue/dist/vue.esm.js',
      static: path.resolve('static'),
      style: path.resolve('src/style'),
      fonts: path.resolve('static/fonts'),
    },
    extensions: [ '.js', '.vue', '.json', '.styl', '.css' ]
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules:[
      {
        test: /\.css$/,
      },
      {
        test: /\.styl(us)?$/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve('src'),
          path.resolve('test')
        ],
        query: {
          "presets": ["env"]
        }
      },
      {
        test: /\.(png|jpeg|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/images/[name].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name:'static/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  stats: {
    // fallback value for stats options when an option is not defined (has precedence over local webpack defaults)
    all: undefined,

    // Add asset Information
    assets: false,

    // Sort assets by a field
    // You can reverse the sort with `!field`.
    assetsSort: "field",

    // Add build date and time information
    builtAt: true,

    // Add information about cached (not built) modules
    cached: true,

    // Show cached assets (setting this to `false` only shows emitted files)
    cachedAssets: true,

    // Add children information
    children: false,

    // Add chunk information (setting this to `false` allows for a less verbose output)
    chunks: false,

    // Add namedChunkGroups information
    chunkGroups: false,

    // Add built modules information to chunk information
    chunkModules: false,

    // Add the origins of chunks and chunk merging info
    chunkOrigins: false,

    // Sort the chunks by a field
    // You can reverse the sort with `!field`. Default is `id`.
    chunksSort: "field",

    // Context directory for request shortening
    // context: "../src/",

    // `webpack --colors` equivalent
    colors: true,

    // Display the distance from the entry point for each module
    depth: false,

    // Display the entry points with the corresponding bundles
    entrypoints: false,

    // Add --env information
    env: false,

    // Add errors
    errors: true,

    // Add details to errors (like resolving log)
    errorDetails: true,

    // // Exclude assets from being displayed in stats
    // // This can be done with a String, a RegExp, a Function getting the assets name
    // // and returning a boolean or an Array of the above.
    // excludeAssets: "filter" | /filter/ | (assetName) => true | false |
    //   ["filter"] | [/filter/] | [(assetName) => true|false],
    //
    // // Exclude modules from being displayed in stats
    // // This can be done with a String, a RegExp, a Function getting the modules source
    // // and returning a boolean or an Array of the above.
    // excludeModules: "filter" | /filter/ | (moduleSource) => true | false |
    //   ["filter"] | [/filter/] | [(moduleSource) => true|false],
    //
    // // See excludeModules
    // exclude: "filter" | /filter/ | (moduleSource) => true | false |
    //   ["filter"] | [/filter/] | [(moduleSource) => true|false],

    // Add the hash of the compilation
    hash: false,

    // Set the maximum number of modules to be shown
    maxModules: 15,

    // Add built modules information
    modules: true,

    // Sort the modules by a field
    // You can reverse the sort with `!field`. Default is `id`.
    modulesSort: "field",

    // Show dependencies and origin of warnings/errors (since webpack 2.5.0)
    moduleTrace: true,

    // Show performance hint when file size exceeds `performance.maxAssetSize`
    performance: false,

    // Show the exports of the modules
    providedExports: false,

    // Add public path information
    publicPath: false,

    // Add information about the reasons why modules are included
    reasons: false,

    // Add the source code of modules
    source: false,

    // Add timing information
    timings: true,

    // Show which exports of a module are used
    usedExports: false,

    // Add webpack version information
    version: true,

    // Add warnings
    warnings: true,

    // Filter warnings to be shown (since webpack 2.4.0),
    // can be a String, Regexp, a function getting the warning and returning a boolean
    // or an Array of a combination of the above. First match wins.
    // warningsFilter: "filter" | /filter/ | ["filter", /filter/] | (warning) => true|false
  },
  output: {
    filename: 'static/js/[name].[hash].js'
  }
};

const StylusLoaderConfig = require(`./VueLoadersManagement.js`);
const Serve_Management = require(`./Serve-Management.js`);

module.exports = (env, argv) => {

  Webpack_Common_Config.plugins.push(
    new webpack.DefinePlugin({
      // 'process.env': Webpack_Common_Config.development.env,
      'METHOD': JSON.stringify(argv.mode),
      'TYPE': JSON.stringify(env.TYPE)
    })
  )

  if (
    argv.mode === 'production'
  ) {
    Webpack_Common_Config.module.rules[0].use = StylusLoaderConfig.CSS.extract
    Webpack_Common_Config.module.rules[1].use = StylusLoaderConfig.STYLUS.extract
    Webpack_Common_Config.module.rules[6].options = StylusLoaderConfig.FILELOADER.extract_options
    // if (env.SERVE) {
    //   Serve_Management( merge(Webpack_Common_Config,require(`./webpack.${argv.mode}.js`)) );
    //   return {}
    // }
  }else {
    console.log('Mounting Dev');
    Webpack_Common_Config.module.rules[0].use = StylusLoaderConfig.CSS.serve
    Webpack_Common_Config.module.rules[1].use = StylusLoaderConfig.STYLUS.serve
    Webpack_Common_Config.module.rules[6].options = StylusLoaderConfig.FILELOADER.serve_options
    Serve_Management( merge(Webpack_Common_Config,require(`./webpack.${argv.mode}.js`)) );
  }

  return merge(Webpack_Common_Config,require(`./webpack.${argv.mode}.js`));
};
