const path = require('path')

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const {
  outputPath,
  rootPath,
  isProd,
} = require('./usefull')

const client = [
  new ExtractTextPlugin({
    filename: (getPath) => {
      return getPath("css/[name].css").replace('bundle', 'main')
    }
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.ProvidePlugin({
    "React": "react",
    "PropTypes": "prop-types",
    "cn": "classnames",
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new CleanWebpackPlugin(path.join(rootPath, './public'), { root: rootPath }),
]

// --------- SERVER -------------

const server = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.ProvidePlugin({
    "React": "react",
    "PropTypes": "prop-types",
    "cn": "classnames",
  }),
]

// --------------- AFTER ------------
if (isProd) {
  client.push(new UglifyJsPlugin())
}
module.exports = {
  client,
  server,
}