const session = require('express-session');
import mongoose from './mongoose';
const mongoStore = require('connect-mongo')(session);

export const sessionStore = new mongoStore({mongooseConnection: mongoose.connection});