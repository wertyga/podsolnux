import mongoose from 'mongoose';

import config from './config';

// mongoose.set('debug', true);
mongoose.Promise = require('bluebird');

mongoose.connect(config.mongoose.uri, { useNewUrlParser: true }, (err) => {
    if(err) {
        console.error(err.message);
    } else {
        console.log('-- Mongoose connect --');
    };
}), config.mongoose.options;


export default mongoose;