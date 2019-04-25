const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

const isProd =  process.env.NODE_ENV === 'production';
const rootPath = process.cwd();

const client = {

  entry: {
    admin: path.join(__dirname, './client/index.js'),
  },

  devtool: isProd ? false : 'inline-source-map',
  target: 'web',
  mode: isProd ? 'production' : 'development',

  output: {
    path: isProd ? path.resolve(process.cwd(), 'public/admin/client') : '/',
    publicPath: '/',
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|json)$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: isProd ? ['babel-loader'] : ['react-hot-loader/webpack', 'babel-loader']

      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [{ loader: 'css-loader' }]
        })
      },

      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          use: [{ loader: 'css-loader', options: { sourceMap: !isProd, } }, { loader: 'sass-loader', options: {
            includePaths: [
              // path.join(rootPath, './client/assets/styles'),
              path.join(rootPath, './Admin/client/styles'),
            ],
            sourceMap: !isProd,
          }}]
        })
      },
      {
        test: /\.eot$|.ttf$|.woff$|.jpg$|.png$|.svg$|.woff2$/,
        loaders: ['file-loader']
      }
    ]
  },

  plugins: [
    !isProd ? new webpack.HotModuleReplacementPlugin() : () => false,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ProvidePlugin({
      'React': 'react',
      "PropTypes":"prop-types",
      cn: 'classnames',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CleanWebpackPlugin(path.join(rootPath, './public/admin'), { root: rootPath }),
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath("css/[name].css").replace('bundle', 'main')
      }
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.json'],
    alias: {
      server: path.join(process.cwd(), './server'),
      shared: path.join(process.cwd(), './shared'),
      admin: path.join(process.cwd(), './Admin'),
    },
  }
};

const server = {

  entry: {
    server: path.join(__dirname, './server/index.js'),
  },

  externals: [nodeExternals()],

  devtool: isProd ? false : 'inline-source-map',
  target: 'node',

  output: {
    path: path.resolve(process.cwd(), 'public/admin/server'),
    publicPath: '/',
    filename: '[name].js',
  }
};

module.exports = isProd ? [client, server] : [client];