import express from 'express';

import { user } from './user/user'
import { priceRoute } from './prices/pricesRoute'
import { printRoute } from './print/printRoute'
import { adminOrderRoute } from './order/adminOrderRoute'

const api = express.Router();

api.use('/user', user)
api.use('/prices', priceRoute)
api.use('/print', printRoute)
api.use('/order', adminOrderRoute)

export default api;