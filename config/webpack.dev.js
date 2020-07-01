var webpackMerge = require('webpack-merge');
var webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var HappyPack = require('happypack');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
console.log('###### ----------> USING DEVELOPMENT <---------- ######');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: helpers.root('static'),
    publicPath: '/',
    filename: '[name].[hash:4].bundle.js',
    chunkFilename: '[id].[hash:4].chunk.js',
    // The name of the global variable which the library's
    // require() function will be assigned to
    // library: '[name]_lib',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          { loader: 'cache-loader' },
          {
            loader: 'thread-loader',
            options: {
              // there should be 1 cpu for the fork-ts-checker-webpack-plugin
              workers: require('os').cpus().length - 1,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
            }
          }
        ]
      },

    ],
  },

  plugins: [

    new HappyPack({
      id: 'ts',
      threads: 3,
      loaders: [
        {
          path: 'ts-loader',
          query: { happyPackMode: true },
          options: {
            transpileOnly: true
          }
        }
      ]
    }),

    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      memoryLimit: 4096,//Memory limit for service process in MB. If service exits with allocation failed error, increase this number. Default: 2048.
      workers: 1 // number: You can split type checking to a few workers to speed-up increment build. Be careful - if you don't want to increase build time, you should keep free 1 core for build and 1 core for a system (for example system with 4 CPUs should use max 2 workers). Second thing - node doesn't share memory between workers - keep in mind that memory usage will increase. Be aware that in some scenarios increasing workers number can increase checking time. Default: ForkTsCheckerWebpackPlugin.ONE_CPU.
    }),

    new ExtractTextPlugin('[name].[hash:4].css'),
    // new CompressionPlugin({
    //   asset: "[path].gz[query]",
    //   algorithm: "gzip",
    //   test: /\.js$|\.html$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // }),
    // new webpack.DllPlugin({
    //   // The path to the manifest file which maps between
    //   // modules included in a bundle and the internal IDs
    //   // within that bundle
    //   path: '/[name]-manifest.json',
    //   // The name of the global variable which the library's
    //   // require function has been assigned to. This must match the
    //   // output.library option above
    //   name: '[name]_lib'
    // }),
    // new webpack.DllReferencePlugin({
    //   context: '.',
    //   manifest: require('./[name]-manifest.json')
    // }),
  ],
  cache: true,
  devServer: {
    clientLogLevel: "none",
    compress: true,
    // watchContentBase: true,
    historyApiFallback: true,
    //stats: "minimal"
    stats: {
      // Examine all modules
      maxModules: Infinity,
      // Display bailout reasons
      optimizationBailout: true,
      // Add asset Information
      assets: true,
      // Sort assets by a field
      // assetsSort: "name",
      // Add information about cached (not built) modules
      cached: true,
      // Show cached assets (setting this to `false` only shows emitted files)
      cachedAssets: false,
      // Add children information
      children: false,
      // Add chunk information (setting this to `false` allows for a less verbose output)
      chunks: true,
      // Add built modules information to chunk information
      chunkModules: false,
      // Add the origins of chunks and chunk merging info
      chunkOrigins: false,
      // Sort the chunks by a field
      chunksSort: "field",
      // Context directory for request shortening
      context: "../src/",
      // `webpack --colors` equivalent
      colors: true,
      // Display the distance from the entry point for each module
      depth: false,
      // Display the entry points with the corresponding bundles
      entrypoints: false,
      // Add errors
      errors: true,
      // Add details to errors (like resolving log)
      errorDetails: true,
      // Exclude modules which match one of the given strings or regular expressions
      exclude: [],
      // Add the hash of the compilation
      hash: true,
      // Set the maximum number of modules to be shown
      maxModules: 15,
      // Add built modules information
      modules: false,
      // Sort the modules by a field
      modulesSort: "field",
      // Show dependencies and origin of warnings/errors (since webpack 2.5.0)
      moduleTrace: false,
      // Show performance hint when file size exceeds `performance.maxAssetSize`
      performance: true,
      // Show the exports of the modules
      providedExports: false,
      // Add public path information
      publicPath: true,
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
      // warningsFilter: "filter" | /filter/ | ["filter", /filter/] | (warning) =>  return true| false
    }
  },
});


