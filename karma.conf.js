var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (config) {
  config.set({
    singleRun: true,

    browsers: [ 'PhantomJS2' ],

    frameworks: [ 'mocha', 'chai' ],

    files: [ './tests.webpack.js' ],

    preprocessors: {
      './app/**/*.js': [ 'webpack', 'sourcemap', 'coverage' ],
      './test/**/*.js': [ 'webpack', 'sourcemap' ],
      './tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'spec', 'coverage' ],

    webpack: {
      target: 'web',
      devtool: 'inline-source-map',

      resolve: {
        extensions: ['', '.js', '.jsx'],

        alias: {
          app: path.join(__dirname, 'app'),
          components: 'app/components',
          reducers: 'app/reducers',
          actions: 'app/actions',
          constants: 'app/constants',
          utils: 'app/utils',
          lib: 'app/lib'
        }
      },

      module: {
        preLoaders: [
          { test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/ }
        ],
        loaders: [
          { test: /\.jsx?$/, loader: 'babel', query: { presets: [ 'es2015', 'react', 'stage-0' ] }, exclude: /node_modules/ }
        ]
      },

      plugins: [
        new webpack.DefinePlugin({
          'process.env': { 'NODE_ENV': JSON.stringify('test') },
          'process.env.NODE_ENV': JSON.stringify('test')
        }),
        new HtmlWebpackPlugin()
      ],

      babel: {
        presets: [ 'es2015', 'react', 'stage-0' ]
      },

      eslint: {
        failOnError: true
      },

      isparta: {
        embedSource: true,
        noAutoWrap: true,

        babel: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    },

    webpackMiddleware: {
      noInfo: true
    },

    coverageReporter: {
      type: 'html',
      dir: path.resolve(__dirname, 'reports', 'coverage'),

      instrumenterOptions: {
        istanbul: {
          noCompact: true
        }
      }
    }
  });
};
