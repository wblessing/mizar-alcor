const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackBundleAnalyzer = require('webpack-bundle-analyzer');

process.env.NODE_ENV = 'production';

module.exports = {
  mode: 'production',
  target: 'web',
  devtool: 'source-map',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    // Display bundle stats
    new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: 'static' }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),

    new webpack.DefinePlugin({
      // This global makes sure React is built in prod mode.
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
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
      minify: {
        // see https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
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
      {
        test: /(\.css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [() => [require('cssnano')]],
              },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
