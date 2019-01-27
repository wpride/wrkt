// This library allows us to combine paths easily
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require('webpack')

const outputDirectory = "build";

const API_URL = {
  development: JSON.stringify('http://localhost:3000'),
  production: JSON.stringify('https://wsp-wrkt.herokuapp.com')
};

const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, outputDirectory),
    publicPath: 'build/',
    filename: 'index_bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.html', '.css']
  },
  module: {
    rules: [
      {
        test: /\.jsx/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/react',
              "@babel/preset-env",
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      }
    ],

  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new CleanWebpackPlugin([outputDirectory]),
    new webpack.DefinePlugin({
      'API_URL': API_URL[environment]
    })
  ],
  devServer: {
    contentBase: './public',
    publicPath: '/',
    hot: true,
    open: true,
  }
};
