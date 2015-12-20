import webpack from 'webpack';
import path from 'path';

export default function makeWebpackConfig(opts) {
  var config = {};

  config.entry = ['babel-polyfill', opts.entry];
  config.plugins = [];
  config.output = {};
  config.module = {};
  config.module.loaders = [];


  if (!opts.production) {
    config.devtool = 'cheap-module-eval-source-map';
  }

  if (opts.watch) {
    config.entry.unshift('webpack-hot-middleware/client');
  }

  config.output.path = process.cwd() + '/dist';
  config.output.filename = 'bundle.js';
  // TODO: make dynamic
  if (opts['public-url']) {
    config.output.publicPath = opts['public-url'];
  }
  else {
    config.output.publicPath = '/public/'
  }

  if (!opts.production) {
    config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
  }

  if (opts.watch) {
    config.plugins.unshift(new webpack.NoErrorsPlugin());
  }

  config.module.loaders.unshift({
    test: /\.jsx?$/,
    loaders: ['babel'],
  });

  config.module.loaders.unshift({
    test: /\.css$/,
    loaders: ['style', 'css'],
  });

  config.module.loaders.unshift({
    test: /\.scss$/,
    loaders: ['style', 'css', 'sass'],
  });

  config.module.loaders.unshift({
    test: /\.less$/,
    loaders: ['style', 'css', 'less'],
  });

  config.module.loaders.unshift({
    test: /\.json$/,
    loaders: ['json'],
  });

  return config;
}

