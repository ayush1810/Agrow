const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode : 'development',
  entry: {
    app:  './src/index.jsx',
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
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets/'),
      components: path.resolve(__dirname, 'src/components/'),
      views: path.resolve(__dirname, 'src/views/'),
      src: path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
    {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
            presets: ['react','es2015','stage-3']
        }
    },
    {
      test: /\.css$/,
      use: [
        'style-loader', 'css-loader','sass-loader'
      ]
    },
    {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
        {
            loader: 'file-loader',
            options:{
                outputPath: 'images/'
            }
        }
        ]
    }
    ]
  },
  // devServer: {
  //   contentBase: 'public',
  //   historyApiFallback: true,
  //   host: 'localhost',
  //   port: 8000,
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3000',
  //       pathRewrite: {'^/api' : ''}
  //     }
  //   }
  // }
  // devtool : 'source-map',
};