const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const plugins = require('./assets/webpack/plugins')
const optimization = require('./assets/webpack/optimization')

const {
  outputPath,
  rootPath,
  isProd,
} = require('./assets/webpack/usefull')

const browserConfig = {
  entry: {
    bundle: path.join(rootPath, './client/client.jsx'),
  },
  devtool: isProd ? false : 'inline-source-map',
  mode: process.env.NODE_ENV || 'development',
  target: 'web',

  output: {
    path: outputPath,
    publicPath:  '/',
    filename: '[name].js'
  },

    module: {
        rules: [
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
                      includePaths: [path.join(rootPath, './client/assets/styles')],
                      sourceMap: !isProd,
                    }}]
                })
            },

            {
                test: /(.woff2|.woff|.eot|.ttf|.otf)$/,
                loader: 'file-loader',
                options: {
                    name: "media/[name].[ext]",
                    publicPath: url => url.replace(/public/, "")
                }
            },
          {
            test: /\.(js|jsx)$/,
            use: ["source-map-loader"],
            enforce: "pre"
          },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: 'babel-loader'
            },

            {
                test: /\.(gif|png|jpeg|jpg|svg)$/i,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "media/[name].[ext]",
                            publicPath: url => url.replace(/public/, "")
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 4,
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 3,
                            },
                        }
                    }
                ]
            }

        ]
    },

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.json'],
    alias: {
      shared: path.join(rootPath, './shared'),
      admin: path.join(rootPath, './Admin'),
      server: path.join(rootPath, './server'),
    },
  },

  plugins: plugins.client,
  optimization: optimization.client,
};


const serverConfig = {
    entry: {
      server: path.join(__dirname, `server/${isProd ? 'index.js' : 'serverDev.js'}`),
    },
  devtool: isProd ? false : 'inline-source-map',
  mode: process.env.NODE_ENV || 'development',
  target: 'node',

  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, 'public', 'server'),
    filename: '[name].js',
    libraryTarget: "commonjs2"
  },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'css-loader/locals'
            },

            {
                test: /\.(sass|scss)$/,
                loaders: [{ loader: 'css-loader' }, { loader: 'sass-loader', options: {
                  includePaths: [path.join(rootPath, './client/assets/styles')],
                  sourceMap: !isProd,
                }}]
            },

            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: 'babel-loader'
            },

            {
                test: /\.(gif|png|jpeg|jpg|svg|woff2|woff|eot|ttf|otf)$/i,
                loaders: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: "media/[name].[ext]",
                                publicPath: url => url.replace(/public/, ""),
                                emitFile: false
                            }
                        }
                        ]
            }

        ]
    },

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.json'],
    alias: {
      shared: path.join(rootPath, './shared'),
      admin: path.join(rootPath, './Admin'),
      server: path.join(rootPath, './server'),
    },
  },

  plugins: plugins.server,
};

module.exports = [browserConfig, serverConfig];

// Output folder structure:
// /public
//  /static
//   *bundle.js
//   /media - media files
//   /css - main.css
// *server.js
