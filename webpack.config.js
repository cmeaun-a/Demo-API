// eslint-disable import/no-extraneous-dependencies
require('@babel/register')

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const DIST_PATH = path.resolve(__dirname, 'public/dist')
const prod = process.env.NODE_ENV === 'production'
const dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

module.exports = {
  mode: dev ? 'development' : 'production',
  entry: './src/client/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    publicPath: '/',
    path: DIST_PATH,
    filename: prod ? '[name]-bundle-[chunkhash:8].js' : '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.join('public/index.html') }),
  ],
  devServer: {
    proxy: {
      '*': 'http://localhost:8000',
    },
  },
}

// YARN WEBPACK (afetr modification of config)
