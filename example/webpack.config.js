const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENTRY = path.join(__dirname);
const OUTPUT = path.join(__dirname);
const BUNDLE_FILENAME = path.join(ENTRY, 'example.js');
const TEMPLATE_ENTRY = path.join(ENTRY, 'template.html');
const TEMPLATE_FILENAME = path.join(OUTPUT, 'index.html');

module.exports = {
  entry: BUNDLE_FILENAME,
  output: {
    path: OUTPUT,
    filename: 'example.output.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dool-DOM Example',
      template: TEMPLATE_ENTRY,
      filename: TEMPLATE_FILENAME,
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
