const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
  mode: 'development',
  target: 'web',
  devtool: 'cheap-module-source-map',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    //stats: 'minimal',
    //overlay: true,
    historyApiFallback: true,
    //disableHostCheck: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    https: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_AUTH0_DOMAIN': JSON.stringify(
        process.env.REACT_APP_AUTH0_DOMAIN
      ),
      'process.env.REACT_APP_AUTH0_CLIENT_ID': JSON.stringify(
        process.env.REACT_APP_AUTH0_CLIENT_ID
      ),
      'process.env.REACT_APP_AUTH0_CALLBACK': JSON.stringify(
        process.env.REACT_APP_AUTH0_CALLBACK
      ),
      'process.env.REACT_APP_AUTH0_AUDIENCE': JSON.stringify(
        process.env.REACT_APP_AUTH0_AUDIENCE
      ),
      'process.env.REACT_APP_JWT_NAMESPACE': JSON.stringify(
        process.env.REACT_APP_JWT_NAMESPACE
      ),
      'process.env.REACT_APP_SERVERLESS_URL': JSON.stringify(
        process.env.REACT_APP_SERVERLESS_URL
      ),
      'process.env.FUNC_AIRTABLE_KEY': JSON.stringify(
        process.env.FUNC_AIRTABLE_KEY
      ),
      'process.env.FUNC_AIRTABLE_AUTHORS_TABLE': JSON.stringify(
        process.env.FUNC_AIRTABLE_AUTHORS_TABLE
      ),
      'process.env.FUNC_AIRTABLE_BASE_ID': JSON.stringify(
        process.env.FUNC_AIRTABLE_BASE_ID
      ),
      'process.env.FUNC_AIRTABLE_COURSES_TABLE': JSON.stringify(
        process.env.FUNC_AIRTABLE_COURSES_TABLE
      ),
      'process.env.FUNC_AUTH0_AUDIENCE': JSON.stringify(
        process.env.FUNC_AUTH0_AUDIENCE
      ),
      'process.env.FUNC_AUTH0_ISSUER': JSON.stringify(
        process.env.FUNC_AUTH0_ISSUER
      ),
      'process.env.FUNC_AUTH0_JWKS_URI': JSON.stringify(
        process.env.FUNC_AUTH0_JWKS_URI
      ),
      'process.env.FUNC_AUTH0_JWT_NAMESPACE': JSON.stringify(
        process.env.FUNC_AUTH0_JWT_NAMESPACE
      ),
      'process.env.FUNC_MONGO_URL': JSON.stringify(process.env.FUNC_MONGO_URL),
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /(\.css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: 'images',
            outputPath: 'images',
          },
        },
      },
    ],
  },
};
