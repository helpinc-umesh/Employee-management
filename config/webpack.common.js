var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
// var ChunkManifestPlugin = require('chunk-manifest-webpack2-plugin');
// var WebpackChunkHash = require('webpack-chunk-hash');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


var environment = (process.env.NODE_ENV || "development").trim();

var isDev = environment === 'development';
var compilersToUse = isDev ? [
  // 'awesome-typescript-loader',
  'happypack/loader?id=ts', // ref to webpack.dev.js
  'angular2-template-loader',
  'angular2-router-loader',
] // form development
  : [
    '@ngtools/webpack',
  ]; // for AoT compilation

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: compilersToUse,
        // exclude: /(node_modules)/,
        // exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash:4].[ext]',
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader'] })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        use: 'raw-loader'

      },
      {
        test: /\.component\.css$/,
        use: [
          { loader: 'raw-loader', },
        ],
      },
      // { test: /\.js/, use: 'imports?define=>false'} 

    ],
  },

  plugins: [

    // new BundleAnalyzerPlugin(),

    new webpack.optimize.ModuleConcatenationPlugin(),

    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      // /angular(\\|\/)core(\\|\/)@angular/,
      /angular(\\|\/)core(\\|\/)(fesm5|esm5)/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.NamedModulesPlugin(function (chunk) {
      var name = chunk.name ? chunk.name
        : chunk.modules.map(function (m) {
          return path.relative(m.context, m.request);
        }).join("_");
      console.log('CHUNK NAMES....', name);
      return name;
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: [
        'app',
        'themeScript',
        'vendor',
        'polyfills'
      ],
      minChunks: function (module) {

        //Infinity this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    // new webpack.SourceMapDevToolPlugin({
    //   // filename: "[file].map",
    //   exclude: ["vendor.ts", "polyfills.ts"]
    // }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),

    new webpack.ProvidePlugin({
      //for jquery
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "window.$": "jquery",
      // slimScroll:'slimScroll',
      //for toastr 
      toastr: "toastr",
      "window.toastr": "toastr",
      'window.Ladda': 'Ladda',
      //  'CodeMirror': 'codemirror',
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 10, // Must be greater than or equal to one
      minChunkSize: 1000 // Set a minimum chunk size.
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 1000 // Minimum number of characters 
    }),
    new DuplicatePackageCheckerPlugin()
  ]
};