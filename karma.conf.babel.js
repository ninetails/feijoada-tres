var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (config) {
  config.set({
    singleRun: true,

    browsers: [ 'PhantomJS2' ],

    files: [
      './test/**/*.spec.js'
    ],

    frameworks: [ 'mocha', 'chai' ],

    preprocessors: {
      './src/**/*.js': [ 'webpack', 'sourcemap', 'coverage' ],
      './test/**/*.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'spec', 'coverage' ],

    webpack: {
      resolve: {
        alias: {
          src: path.resolve(__dirname, 'src'),
          components: 'src/components'
        },
        extensions: ['', '.js', '.jsx']
      },

      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel', exclude: /(node_modules)/, include: /test/ },
          { test: /\.jsx?$/, loader: 'isparta', exclude: /(node_modules|test)/ }
        ]
      },

      devtool: 'inline-source-map',

      babel: {
        presets: [ 'es2015', 'react', 'stage-0' ]
      },

      isparta: {
        embedSource: true,
        noAutoWrap: true,

        babel: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },

      plugins: [
        new HtmlWebpackPlugin()
      ]
    },

    webpackMiddleware: {
      noInfo: true
    },

    coverageReporter: {
      type: 'html',
      dir: 'coverage',

      instrumenterOptions: {
        istanbul: {
          noCompact: true
        }
      }
    }
  });
};
