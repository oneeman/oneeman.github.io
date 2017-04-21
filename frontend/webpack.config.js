var webpack = require("webpack");

const config = {
  entry: {
    "foo/generic": './src/foo/generic.js',
    misanthropy: './src/misanthropy.js',
    vendor: ["react", "lodash"]
  },

  output: {
    filename: '[name].js',
    path: __dirname + "/.."
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.js"})
  ]}

module.exports = config;
