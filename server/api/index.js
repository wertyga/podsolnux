import express from 'express';

import { userRoute } from './user/userRoute'
import { priceRoute } from './prices/pricesRoute'
import { printRoute } from './print/printRoute'

const api = express.Router();

api.use('/user', userRoute)
api.use('/prices', priceRoute)
api.use('/print', printRoute)

export default api;