import util from 'util';
import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import { config as pkgConfig } from './package.json';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default (
  (env, common) =>
    env === 'production'

    // production only
    ? {
      ...common,

      devtool: 'source-map',

      plugins: [
        ...common.plugins,
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          mangle: true,
          output: {
            comments: false
          },
          compress: {
            warnings: false
          }
        })
      ]
    }

    // development only
    : {
      ...common,

      debug: true,
      cache: true,
      devtool: 'inline-source-map',

      entry: [
        common.entry,
        util.format('webpack-dev-server/client?http://%s:%d', pkgConfig.devServerHost, pkgConfig.devServerPort),
        'webpack/hot/dev-server'
      ],

      module: {
        ...common.module,
        preLoaders: [
          { test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/ }
        ]
      },

      plugins: [
        ...common.plugins,
        new HtmlWebpackPlugin()
      ],

      eslint: {
        failOnError: true
      },

      devServer: {
        contentBase: path.resolve(__dirname, pkgConfig.buildDir),
        hot: true,
        noInfo: false,
        inline: true,
        stats: { colors: true }
      }
    }
)(
  process.env.NODE_ENV || 'development',

  // config for both development and production
  {
    entry: './app',

    output: {
      path: path.resolve(__dirname, pkgConfig.buildDir),
      filename: 'bundle.js',
      publicPath: '/'
    },

    target: 'web',

    resolve: {
      extensions: ['', '.js', '.jsx', 'styl'],

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
      loaders: [
        { test: /\.jsx?$/, loader: 'babel', query: { presets: [ 'es2015', 'react', 'stage-0' ] }, exclude: /node_modules/ },
        { test: /\.styl$/, loader: 'style!css?sourceMap&minimize!postcss!stylus', exclude: /node_modules/ },
        { test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$/, loader: 'file?name=[path][name].[ext]' }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': { 'NODE_ENV': JSON.stringify(process.env.NODE_ENV) },
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ],

    babel: {
      presets: [ 'es2015', 'react', 'stage-0' ]
    },

    postcss: [
      autoprefixer
    ]
  }
);
