import util from 'util';
import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import { config as pkgConfig } from './package.json';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = (env, common) => {
  return Object.assign(common, env === 'production' ? {
    plugins: [
      ...common.plugins
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
  } : {
    entry: [
      debug: true,
      cache: true,

      common.entry,
      util.format('webpack-dev-server/client?http://%s:%d', pkgConfig.devServerHost, pkgConfig.devServerPort),
      'webpack/hot/dev-server'
    ],

    plugins: [
      ...common.plugins,
      new HtmlWebpackPlugin()
    ],

    devServer: {
      contentBase: path.resolve(__dirname, pkgConfig.buildDir),
      hot: true,
      noInfo: false,
      inline: true,
      stats: { colors: true }
    }
  });
};

export default config(process.env.NODE_ENV || 'development', {
  entry: './index.js',

  output: {
    path: path.resolve(__dirname, pkgConfig.buildDir),
    filename: 'bundle.js',
    publicPath: '/'
  },

  target: 'web',
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'inline-source-map',

  resolve: {
    extensions: ['', '.js', '.jsx', 'styl'],

    alias: {
      app: path.resolve(__dirname, 'app'),
      components: 'app/components',
      libs: 'app/libs'
    }
  },

  module: {
    loaders: [
      { test: /\.jsx?/, loader: 'babel', query: { presets: [ 'es2015', 'react', 'stage-0' ] }, exclude: /node_modules/, include: /app/ },
      { test: /\.styl/, loader: 'style!css?sourceMap&minimize!postcss!stylus' },
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
});
