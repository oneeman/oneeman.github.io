var webpack = require("webpack");

const config = {
  entry: {
    misanthropy: './src/misanthropy.jsx',
    vendor: ["react", "lodash"],
  },

  output: {
    filename: '[name].js',
    path: __dirname + "/..",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.js"}),
  ],
};

module.exports = config;
