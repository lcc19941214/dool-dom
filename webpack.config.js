const path = require('path');

const ENTRY = path.join(__dirname, 'src/index.js');
const OUTPUT = path.join(__dirname, 'lib');

module.exports = {
  entry: ENTRY,
  output: {
    path: OUTPUT,
    filename: 'virtual-dom-base.js'
  },
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
