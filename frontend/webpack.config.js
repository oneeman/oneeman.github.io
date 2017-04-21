var webpack = require("webpack");

const config = {
  entry: {
    "foo/generic": './src/foo/generic.js',
    "misanthropy_new": './src/misanthropy.js',
    vendor: ["react", "lodash"]
  },

  output: {
    filename: '[name].js',
    path: __dirname + "/.."
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.js"})
  ]}

module.exports = config;
