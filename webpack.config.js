const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode : 'development',
  entry: {
    app:  './src/app.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js'
  },
  optimization: {
    splitChunks: {
        cacheGroups: {
            commons: { 
              test: /[\\/]node_modules[\\/]/,
              name: "vendor",
              chunks: "all" 
            }
        }
    }
},
  plugins: [
  
  ],
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
  },
  devtool : 'source-map',
};