import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import { config } from './common/config';
import sessionStore from './common/sessionStore';
import session from 'express-session';
import handleRequest from './app';

import api from './api';

// ****************** Import routes *************

//***********************************************

export const app = express();
export const server = require('http').Server(app);

//************************* GARBAGE magic ***********************************

// Для работы с garbage collector запустите проект с параметрами:
// node --nouse-idle-notification --expose-gc app.js
let gcInterval;

function init() {
  gcInterval = setInterval(function () {
    gcDo();
  }, 60000);
};

function gcDo() {
  global.gc();
  clearInterval(gcInterval);
  init();
};

init();

//************************************************************

app.use(bodyParser.json());
app.use(express.static(path.join(process.cwd(), './podsolnux/public/static')));
app.use(express.static(path.join(process.cwd(), './podsolnux')));
app.use(express.static(path.join(process.cwd(), './podsolnux/BANNERS')));
app.use(express.static(path.join(process.cwd(), './podsolnux/ORDERS')));
app.use(session({
  secret: config.session.secret,
  saveUninitialized: false,
  resave: true,
  key: config.session.key,
  cookie: config.session.cookie,
  store: sessionStore
}));

//******************************** Routes ***************************
app.use('/api', api);

app.use(handleRequest());

server.listen(config.PORT, () => console.log(`Server run on ${config.PORT} port`));

//******************************** Uncaught Exception ***************************

process.on('uncaughtException', function (err) {
    log.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    log.error(err.stack);
    process.exit(1);
});






