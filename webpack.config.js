const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ENTRY = path.join(__dirname, 'src/index.js');
const OUTPUT = path.join(__dirname, 'lib');
const filename = (strings, ...values) => {
  const name = 'virtual-dom-base';
  const [uglify] = values;
  const ext = 'js';
  return [name, uglify ? 'min' : '', ext].filter(v => v).join('.');
};

const plugins = [];

if (argv.uglify) {
  plugins.push(
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        mangle: true
      }
    })
  );
}

module.exports = {
  entry: ENTRY,
  output: {
    path: OUTPUT,
    filename: filename`${argv.uglify}`
  },
  plugins,
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
