const path = require('path');

module.exports = {
  mode : 'development',
  entry:  './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.bundle.js'
  },
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