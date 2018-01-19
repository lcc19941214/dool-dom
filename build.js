const util = require('util');
const { promisify } = util;
const w = require('webpack');
const webpack = promisify(w);

const options = require('./webpack.config');

(async () => {
  try {
    const stats = await webpack(options);
    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    console.log(
      stats.toString({
        chunks: false,
        colors: true
      })
    );
  } catch (error) {
    console.error(error.stack || error);
    if (error.details) {
      console.error(error.details);
    }
  }
  process.exit();
})();
