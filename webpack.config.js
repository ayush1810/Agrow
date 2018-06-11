const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode : 'development',
  entry:  './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         chunks: 'all',
  //         name: 'vendor',
  //         test: 'vendor',
  //         enforce: true
  //       },
  //     }
  //   },
  //   runtimeChunk: true
  // },
  // plugins: [
  
  // ],
  module: {
    rules: [
    {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
            presets: ['react','es2015']
        }
    },
    ]
  }
};