import express from 'express';

import { userRoute } from './user/userRoute'
import { priceRoute } from './prices/pricesRoute'
import { printRoute } from './print/printRoute'
import { orderRoute } from './order/orderRoute'
import { bannersRoute } from './banners/bannerRoute'

const api = express.Router();

api.use('/user', userRoute)
api.use('/prices', priceRoute)
api.use('/print', printRoute)
api.use('/order', orderRoute)
api.use('/banners', bannersRoute)

export default api;