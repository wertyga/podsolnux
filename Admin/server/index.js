import express from 'express';
import bodyParser from 'body-parser';

import path from 'path';
import http from 'http';

import session from 'express-session';
import { config } from './common/config';
import { sessionStore } from './common/sessionStore';
import { getHtml } from './getHtml'
import api from './routes'

//**************** MIDDLEWARES ****************
import { authCheck } from './middlewares'

//********************************************

const dev = process.env.NODE_ENV.trim() === 'development';

const app = express();

//****************** Webpack ********************
if(dev) {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.admin.config');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackMiddleware = require('webpack-dev-middleware');

  const compiler = webpack(webpackConfig);

  app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig[0].output.publicPath,
    noInfo: true
  }));
  app.use(webpackHotMiddleware(compiler));
}

//**********************************************

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '500mb'
  }));

  //************ STATIC **************
  app.use(express.static(__dirname));
  app.use(express.static(path.join(process.cwd(), './public/admin/client')));
  //****************************************

  //**************** SESSION ********************
  app.use(session({
    secret: config.session.secret,
    saveUninitialized: false,
    resave: true,
    key: config.session.key,
    cookie: config.session.cookie,
    store: sessionStore
  }));
  //*********************************************

  //******************************** Routes ***************************
  // app.use(authCheck)
  app.use('/api', api)

  app.get('/*', authCheck, (req, res) => {
    res.send(getHtml())
  });

  //******************************** Run server ***************************

  const server = http.createServer(app);

  server.listen(config.admin.PORT, () => console.log(`Server run on ${config.admin.PORT} port`));

//******************************** Uncaught Exception ***************************

process.on('uncaughtException', function (err) {
    console.error('uncaughtException:', err.message);
    process.exit(1);
});

// ********************************************************************************









