const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ENTRY = path.join(__dirname, 'src');

const OUTPUT = path.join(__dirname, 'lib');
const filename = (strings, ...values) => {
  const name = 'dool-dom';
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
  entry: path.resolve(ENTRY, 'index.js'),
  output: {
    path: OUTPUT,
    filename: filename`${argv.uglify}`,
    library: 'Dool',
    libraryTarget: 'umd'
  },
  plugins,
  resolve: {
    extensions: ['.js', '.css', '.less'],
    alias: {
      '@': ENTRY,
    }
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
