const webpack = require('webpack');
const path = require('path');
const BUILD_DIR = path.resolve(__dirname, 'dist/');
const APP_DIR = path.resolve(__dirname, 'public/js/');

const babelLoader = { 
  test: /.jsx?$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  query: {
    presets: ['es2015']
  }
};

const handlebars = { 
 test: /\.hbs$/,
 loader: 'handlebars-loader'
};

const config = {
  entry: APP_DIR + '/main.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [ babelLoader, handlebars ]
  },
  cache: false,
  watch: true
};

module.exports = config;
