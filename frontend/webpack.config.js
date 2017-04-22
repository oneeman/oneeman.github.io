var webpack = require("webpack");

function isExternal(module) {
  var userRequest = module.userRequest;

  if (typeof userRequest !== 'string') {
    return false;
  }

  return userRequest.indexOf('bower_components') >= 0 ||
    userRequest.indexOf('node_modules') >= 0 ||
    userRequest.indexOf('libraries') >= 0;
}

const config = {
  entry: {
    misanthropy: './src/misanthropy.jsx',
  },

  output: {
    filename: '[name].js',
    path: __dirname + "/..",
  },
  externals: {vendor: true},
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
  devtool: 'source-map',

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        return isExternal(module);
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: true
    }),
  ]
};

module.exports = config;
