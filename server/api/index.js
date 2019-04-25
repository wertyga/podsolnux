import express from 'express';

import { userRoute } from './user/userRoute'
import { priceRoute } from './prices/pricesRoute'

const api = express.Router();

api.use('/user', userRoute)
api.use('/prices', priceRoute)

export default api;