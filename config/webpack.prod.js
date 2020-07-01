var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var commonConfig = require('./webpack.common.js');
// var AotPlugin = require('@ngtools/webpack').AotPlugin;
var AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
var CompressionPlugin = require("compression-webpack-plugin");
var helpers = require('./helpers');

var ENV = process.env.NODE_ENV = process.env.ENV = 'production';

console.log('###### ----------> USING PRODUCTION <---------- ######');

module.exports = webpackMerge(commonConfig, {
  // devtool: 'source-map',
  output: {
    path: helpers.root('Static/App/career'),
    publicPath: '/Static/App/career/',
    // publicPath: '/',
    filename: '[name].[hash:4].js',
    chunkFilename: '[id].[chunkhash:4].js'
  },

  plugins: [
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new UglifyJSPlugin({
      uglifyOptions: {
        output: {
          comments: false,
          beautify: false,
        },
        compress: {
          drop_console: true, // discard "console.log" statements
          negate_iife: true, // negate "Immediately-Called Function Expressions" where the return value is discarded, to avoid the parens that the code generator would insert.
          sequences: true,  // join consecutive statemets with the “comma operator”
          properties: true,  // optimize property access: a["foo"] → a.foo
          dead_code: true,  // discard unreachable code
          drop_debugger: true,  // discard “debugger” statements
          unsafe: false, // some unsafe optimizations (see below)
          conditionals: true,  // optimize if-s and conditional expressions
          comparisons: true,  // optimize comparisons
          evaluate: true,  // evaluate constant expressions
          booleans: true,  // optimize boolean expressions
          loops: true,  // optimize loops
          unused: true,  // drop unused variables/functions
          hoist_funs: true,  // hoist function declarations
          hoist_vars: false, // hoist variable declarations
          if_return: true,  // optimize if-s followed by return/continue
          join_vars: true,  // join var declarations
          cascade: true,  // try to cascade `right` into `left` in sequences
          side_effects: true,  // drop side-effect-free statements
          warnings: false,  // warn about potentially dangerous optimizations/code
          collapse_vars: true, //  Collapse single-use non-constant variables - side effects permitting.
          // hoist_props: true, // hoist properties from constant object and array literals into regular variables subject to a set of constraints. For example: var o={p:1, q:2}; f(o.p, o.q); is converted to f(1, 2);. Note: hoist_props works best with mangle enabled, the compress option passes set to 2 or higher, and the compress option toplevel enabled.
          reduce_vars: true, // Improve optimization on variables assigned with and used as constant values.
          switches: true, // de-duplicate and remove unreachable switch branches
          unsafe_proto: true, //  optimize expressions like Array.prototype.slice.call(a) into [].slice.call(a)

        },
        parallel: {
          cache: true,
          workers: 2 // for e.g
        },
        ie8: false,
        ecma: 7,
        cache: true,

        // https://github.com/angular/angular/issues/10618
        mangle: {
          keep_fnames: true,
        },
      },
      sourceMap: false,


    }),

    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false, // workaround for ng2
        debug: false
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      fileName: 'index.html',
      // hash: true,
      minify: {
        removeAttributeQuotes: false,//Remove quotes around attributes when possible
        minifyJS: true, //Minify JavaScript in script elements and event attributes (uses UglifyJS)
        minifyCSS: true, //Minify CSS in style elements and style attributes (uses clean-css)
        removeComments: true, // Strip HTML comments
        removeTagWhitespace: true, //Remove space between attributes whenever possible. Note that this will result in invalid HTML!
        trimCustomFragments: true, // Trim white space around ignoreCustomFragments.
        collapseWhitespace: true, //Collapse white space that contributes to text nodes in a document tree
        collapseInlineTagWhitespace: true, //Don't leave any spaces between display:inline; elements when collapsing. Must be used in conjunction with collapseWhitespace=true
      }
    }),
    new AngularCompilerPlugin({
      tsConfigPath: './tsconfig.json',
      entryModule: helpers.root('./src/app/app.module#AppModule'),
      // mainPath: './src/main-aot.ts'
    }),
    // new CompressionPlugin({
    //   asset: "[path].gz[query]",
    //   algorithm: "gzip",
    //   test: /\.js$|\.html$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // }),

  ]
});
