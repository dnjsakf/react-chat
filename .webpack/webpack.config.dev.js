const config = require("./webpack.config.js");

const merge = require("webpack-merge");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(config, {
  mode: "development",
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
    }),
    new webpack.EnvironmentPlugin({
      LOGGING_LEVEL: JSON.stringify("DEBUG"),
      DEBUG: 1
    }),
  ],
  module:{
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)?$/,
        include: /node_modules/,
        use: ['react-hot-loader/webpack'],
      },
    ]
  },
  optimization: {
    namedChunks: true,
  },
  devServer: {
    host: "localhost",
    port: 4000,
    hot: true,
    watchContentBase: true,
    contentBase: config.output.path,
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: "http://localhost:3000"
      },
      '/socket.io': {
        target: "http://localhost:3000",
        ws: true,
      }
    }
  },
});