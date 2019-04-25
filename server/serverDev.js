import express from 'express';
import bodyParser from 'body-parser';

import { config } from './common/config';
import sessionStore from './common/sessionStore';
import session from 'express-session';
import api from './api';
import serverRenderer from './app';

export const app = express();
export const server = require('http').Server(app);

app.use(bodyParser.json());
app.use(express.static('public/static'));
app.use(express.static(process.cwd()));
app.use(session({
  secret: config.session.secret,
  saveUninitialized: false,
  resave: true,
  key: config.session.key,
  cookie: config.session.cookie,
  store: sessionStore
}));

app.use('/api', api);

app.use(serverRenderer());

server.listen(config.PORT, () => console.log(`Server run on ${config.PORT} port`));

//******************************** Uncaught Exception ***************************

process.on('uncaughtException', function (err) {
  console.error(err);
  process.exit(1);
});






